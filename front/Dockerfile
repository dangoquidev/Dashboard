FROM node:20-alpine

WORKDIR /front

COPY . .

RUN yarn cache clean

RUN yarn install

CMD ["yarn", "dev"]
