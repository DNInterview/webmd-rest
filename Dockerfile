FROM node:12-alpine
MAINTAINER dn-webmd

RUN mkdir /opt/webmd-rest

WORKDIR /opt/webmd-rest

COPY . /opt/webmd-rest

RUN yarn install --production

EXPOSE 3000

CMD ["yarn", "start"]
