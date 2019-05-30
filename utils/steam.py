import logging
import traceback
from aio_ping import ping
from steam import game_servers as gs


async def _ping_server(ip_address):
    """
    pings the given ip address
    :param ip_address:
    :return: float
    """
    return ping(ip_address, timeout=1000, count=1)


async def get_server_info(address):
    """
    get steam server information
    :param address: tuple with ip and port | ('some.ip.here', 27015)
    :return:
    """
    try:
        result = gs.a2s_info(address)
        ping = await _ping_server(address[0])
    except Exception as e:
        logging.error(traceback.format_exc())
        result = None
        ping = None

    if ping and result:
        result['ping'] = ping
    return result

