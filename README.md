## About
Simple game server monitor, for situations where you don't have a control panel. Monitor your steam game servers. Currently shows server status (up/down), server name, player count and ping. Should not be used in production, since each visit to the monitor performs request to the steam api. If you want to run this in a production environment you should define a global server update method, instead of updating on each request.

## Installation
Add your servers to `config.py` 

### Docker
`docker build -t steam-server-monitor .`

`docker run -p 5000:5000 steam-server-monitor`
### OS
`git clone https://github.com/thobiasn/steam-server-monitor`

`pip3 install -r requirements.txt`

`python3 app.py`
