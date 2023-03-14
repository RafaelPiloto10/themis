# RFID Reader

## Installation

- Python +3.8
	- install several dependencies:
		- socket.io
		- aiohttp

- NodeJS/pnpm
	- install several dependencies:
		- `pnpm install`

- Cron Job
	- ```
		@reboot python3 server.py &
		@reboot pnpm run &
		@reboot xdg-open http://localhost:3000
	  ```

## Running

- Backend:
	- `python3 server.py`

- Frontend (dev):
	- `pnpm run`
- Frontend (prod):
	- ...?
