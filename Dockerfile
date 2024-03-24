# base image - import from docker hub
FROM ubuntu:focal

# run commands
RUN /usr/bin/apt-get update && \
    /usr/bin/apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    /usr/bin/apt-get update && \
    /usr/bin/apt-get upgrade -y && \
    /usr/bin/apt-get install -y nodejs ffmpeg

    # setup working dir
WORKDIR /home/app

RUN npm i -g nodemon

CMD nodemon index.js