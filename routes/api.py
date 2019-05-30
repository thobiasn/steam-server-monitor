import json

from aiohttp import web

import config
from utils.steam import get_server_info

routes_api = web.RouteTableDef()


@routes_api.get('/api/servers')
async def get_servers(request):
    result = []
    for server in config.SERVERS:
        info = await get_server_info(server)
        if info:
            info['address'] = '%s:%s' % server
        result.append(info)
    return web.json_response(text=json.dumps(result, indent=4))
