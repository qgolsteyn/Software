FROM moveit/moveit:melodic-ci

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY . .

CMD ["printenv"]