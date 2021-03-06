import logging
import sys

from aiohttp import web
import aiohttp_jinja2
import jinja2

import config
from routes.api import routes_api
from routes.ui import routes_ui


def make_app():
    app = web.Application()
    aiohttp_jinja2.setup(app, loader=jinja2.FileSystemLoader('templates'))

    handlers = [
        logging.StreamHandler(sys.stdout),
    ]
    logging.basicConfig(level=config.LOG_LEVEL, handlers=handlers)

    app.add_routes(routes_api)
    app.add_routes(routes_ui)

    app['static_root_url'] = '/public'
    app.router.add_static('/public', 'templates/public')

    return app


web.run_app(make_app(), port=5000)
