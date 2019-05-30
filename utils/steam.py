import logging
import traceback
import asyncio

from steam import game_servers as gs


async def get_server_info(address):
    """
    get steam server information
    :param address: tuple with ip and port | ('some.ip.here', 27015)
    :return: dict or None
    """
    def _sync_operation():
        try:
            result = gs.a2s_info(address)
        except Exception as e:
            logging.error(traceback.format_exc())
            result = None
        return result
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(None, _sync_operation)
