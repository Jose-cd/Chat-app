FROM node:12-alpine

WORKDIR /opt/usr/app

# install app dependencies
COPY package.json ./
RUN yarn install 

# add app
COPY . ./

CMD ["yarn", "watch"]