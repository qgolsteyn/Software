FROM ubuntu:18.04

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY . .

CMD ["printenv"]