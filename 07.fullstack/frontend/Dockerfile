# syntax=docker/dockerfile:1.4

FROM node:22.12.0 AS development

WORKDIR /code

EXPOSE 5173

COPY package.json .
COPY yarn.lock .
# RUN rm -rf node_modules
RUN yarn install --frozen-lockfile

COPY ./vite ./vite

CMD ["yarn", "dev"]