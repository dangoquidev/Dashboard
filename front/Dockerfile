FROM node:20-alpine as BUILD_IMAGE

WORKDIR /front

COPY package.json .

RUN yarn

COPY . .

RUN yarn build

FROM node:20-alpine as PROD_IMAGE
WORKDIR /front

COPY --from=BUILD_IMAGE /front/dist /front/dist

EXPOSE 8081

COPY package.json .
COPY vite.config.ts .

RUN yarn add typescript

EXPOSE 8081

CMD ["yarn", "preview"]
