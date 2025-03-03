# syntax=docker/dockerfile:1.4

FROM node:22.12.0

WORKDIR /code

# port 80 for node, and 9229 and 9230 (tests) for debug
EXPOSE 80 9229 9230

COPY package.json .
COPY package-lock.json .
RUN npm ci

# check every 30s to ensure this service returns HTTP 200
HEALTHCHECK --interval=30s \
  CMD node healthcheck.js

# copy in our source code last, as it changes the most
COPY . .

CMD ["node", "src/index.js"]
