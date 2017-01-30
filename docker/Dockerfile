FROM mhart/alpine-node:7.5

MAINTAINER jeff_e_shaver

# install curl and git
RUN apk add --no-cache git \
  && git clone https://github.com/jeffshaver/mp-app -b apollo --single-branch \
  && apk del git

ENV NODE_ENV production

RUN mkdir -p /opt/app
WORKDIR /opt/app

RUN cp /mp-app/package.json /opt/app/package.json

ARG PORT=3000
ENV PORT ${PORT}

RUN NODE_ENV=development npm install \
  && cp -R /mp-app/. /opt/app/ \
  && npm run build \
  && rm -rf \
    /mp-app \
    /opt/app/yarn.lock \
    /root/.npm \
    /tmp/npm* \
    /opt/app/node_modules \
  && npm install \
    compression \
    express \
    morgan \
    serve-static

EXPOSE $PORT
CMD ["node", "server/index.js"]
