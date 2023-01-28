FROM node:18-bullseye-slim

ARG workspace
ENV NODE_ENV=production WORKSPACE=${workspace}
WORKDIR /usr/app

COPY package*.json .
COPY libs libs
COPY ${workspace} ${workspace}
RUN npm ci -w ${workspace} -w libs/* --omit=dev

CMD npm start -w $WORKSPACE