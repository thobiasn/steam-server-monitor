FROM python:3.7.3-stretch

# copy the files to the docker container
ADD . /usr/local/steam-server-monitor/

# Install the server monitor requirements
RUN cd /usr/local/steam-server-monitor/ \
    && pip install -r requirements.txt

WORKDIR /usr/local/steam-server-monitor/

ENTRYPOINT python app.py

# Expose ports
EXPOSE 5000
