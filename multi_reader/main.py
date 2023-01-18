import multi_reader
import time

# ADJUST AS NEEDED
FIRST_PORT = 3 # Change this to the lowest port that is connected to the reader
NUMBER_OF_READERS = 4 # This is the number of readers conencted in the circuit
READ_WAIT_TIME = 1 # This is the time in seconds that the program pauses after one read

# DO NOT CHANGE ANYTHING BELOW THIS LINE
BOOT_TIME_SLEEP = 5 # This is the time in seconds that the program pauses to warm up electronics

if __name__ == "__main__":
    rmr = multi_reader.RFIDMultiReader()

    print("[BOOT] Adding boards to Multi Reader...")
    
    for i in range(NUMBER_OF_READERS):
        print("[BOOT] Added board with ID: {i} and PORT: {FIRST_PORT + i}")
        rmr.addBoard(str(i), FIRST_PORT + i) 

    print("[BOOT] Boards added to multi reader...")
    print("[BOOT] Pausing for 5 seconds to warm up electronics...")

    time.sleep(BOOT_TIME_SLEEP)

    print("[BOOT] Ready")

    reader = 0

    while True:
        print(f"[INFO] read value: {rmr.read(str(reader))}, from reader with ID: {reader} at PORT: {reader + FIRST_PORT}")
        reader = (reader + 1) % NUMBER_OF_READERS
        time.sleep(1)
