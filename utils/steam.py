import logging
import traceback
from steam import game_servers as gs


async def get_server_info(address):
    """
    get steam server information
    :param address: tuple with ip and port | ('some.ip.here', 27015)
    :return:
    """
    try:
        result = gs.a2s_info(address)
    except Exception as e:
        logging.error(traceback.format_exc())
        result = None

    return result

