from aiohttp import web
import asyncio
import socketio
import multi_reader
import time
import RPi.GPIO as GPIO

# ADJUST AS NEEDED
READ_WAIT_TIME = 0.01 # This is the time in seconds that the program pauses after one read
LEFT_READER_PORTS = [7, 13, 33, 40, 37, 15, 16, 32, 38, 35]
RIGHT_READER_PORTS = [11, 12, 8, 10, 18, 22, 29, 31, 36, 26]

# DO NOT CHANGE ANYTHING BELOW THIS LINE
BOOT_TIME_SLEEP = 5 # This is the time in seconds that the program pauses to warm up electronics
POLL_TIME = 2

READER_PORTS = [LEFT_READER_PORTS, RIGHT_READER_PORTS]
ids = {}
for s_i, side in enumerate(READER_PORTS):
    for p_i, port in enumerate(side):
        ids[port] = (s_i, p_i)

rmr = multi_reader.RFIDMultiReader()

sio = socketio.AsyncServer(async_mode='aiohttp', cors_allowed_origins='*')
app = web.Application()
sio.attach(app)

data = [[""] * 10,
        [""] * 10]

@sio.event
def connect(sid, environ, auth):
    print(f"[CONNECT]: ${sid}")

@sio.event
def disconnect(sid):
    print(f"[DISCONNECT]: ${sid}")

async def broadcast_data():
    """
    Broadcasts currently recorded data to all listeners on our socket
    """
    while True:
        await asyncio.sleep(POLL_TIME)
        await sio.emit("data", data)

async def poll_readers():
    """
    Poll reader data and update records with values read from the RFID readers
    Note: though this runs asynchronously, this is the only write coroutine, so
    we do not need a lock
    """
    while True:
        for side in READER_PORTS:
            for port in side:
                v = rmr.read(str(port))
                if v:
                    s_i, p_i = ids[port]
                    data[s_i][p_i] = v
                    print(f"{s_i} {p_i} {v}")
                else:
                    s_i, p_i = ids[port]
                    data[s_i][p_i] = ""

                await asyncio.sleep(READ_WAIT_TIME)

async def socket_server():
    print("[SERVER]: running app")
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner)
    await site.start()
    await asyncio.Event().wait()

if __name__ == "__main__":
    try:
        print("[BOOT] Adding boards to Multi Reader...")
        for side in READER_PORTS:
            for port in side:
                print(f"[BOOT] Added board with PORT: {port}")
                rmr.addBoard(str(port), port) 

        print("[BOOT] Boards added to multi reader...")
        print("[BOOT] Pausing for 5 seconds to warm up electronics...")

        time.sleep(BOOT_TIME_SLEEP)
        print("[BOOT] Ready: running...")

        loop = asyncio.new_event_loop()
        loop.create_task(socket_server())
        loop.create_task(poll_readers())
        loop.create_task(broadcast_data())
        loop.run_forever()

    except:
        GPIO.cleanup()
