from aiohttp import web
import aiohttp_jinja2

import config
from utils.steam import get_server_info

routes_ui = web.RouteTableDef()


@routes_ui.get('/')
async def get_api_object(request):
    servers = [await get_server_info(s) for s in config.SERVERS]
    result = {
        'msg': 'Hello World!',
        'servers': servers
    }
    return aiohttp_jinja2.render_template('index.jinja2', request, context=result)
