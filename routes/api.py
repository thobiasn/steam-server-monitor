import json

from aiohttp import web

import config
from utils.steam import get_server_info

routes_api = web.RouteTableDef()


@routes_api.get('/api/servers')
async def get_servers(request):
    result = [await get_server_info(s) for s in config.SERVERS]
    return web.json_response(text=json.dumps(result, indent=4))
