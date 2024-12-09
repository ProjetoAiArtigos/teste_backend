FROM node:23.3.0-alpine3.20 AS build
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN apk add --no-cache --virtual .gyp python3 make g++ git
RUN yarn install && yarn cache clean
RUN yarn run build
RUN apk del .gyp

FROM node:23.3.0-alpine3.20 AS run
EXPOSE 3000
RUN apk add dumb-init git
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/build /usr/src/app/build
COPY --chown=node:node package.json /usr/src/app/
COPY --chown=node:node tsconfig.json /usr/src/app/
COPY --chown=node:node . .
RUN yarn install --production && yarn cache clean
USER node
CMD ["dumb-init", "yarn", "start"]