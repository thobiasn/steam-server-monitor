## About
Simple game server monitor, for situations where you don't have a control panel. Monitor your steam game servers. Should not be used in production.

## Installation
Add your servers to `config.py` 

### Docker
`docker build -t steam-server-monitor .`

`docker run -p 5000:5000 steam-server-monitor`
### OS
`git clone https://github.com/thobiasn/steam-server-monitor`

`pip3 install -r requirements.txt`

`python3 app.py`