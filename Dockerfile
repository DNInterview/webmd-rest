FROM node:12-alpine
MAINTAINER dn-webmd

RUN mkdir /opt/webmd-rest

WORKDIR /opt/webmd-rest

COPY . /opt/webmd-rest

RUN npm install --only=prod

EXPOSE 3000

CMD ["npm", "run", "start"]
