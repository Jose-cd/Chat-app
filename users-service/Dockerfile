FROM node:12-alpine

COPY . /opt/usr/app

WORKDIR /opt/usr/app

RUN yarn install

CMD ["yarn", "watch"]