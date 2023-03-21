# Themis

## Installation

  - Python +3.8
    - install several dependencies: `pip3 install -r requirements.txt`

  - NodeJS/pnpm
    - Install Node
    - Install pnpm
    - Install several dependencies:
      - `pnpm install`

## Updating the Client

  - Open a new terminal and paste: `cd ~/Desktop/themis/client; git pull origin main; pnpm install; pnpm build`
  - If all looks well (there are no glaring red errors -- you might need to scroll up a little bit to confirm),
	  power cycle the Pi. If you do not see the new updates, type `Ctrl-Shift-R` to delete the browser cache.
