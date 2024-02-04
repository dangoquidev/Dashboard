FROM node:20-alpine

WORKDIR /back

COPY . .

RUN yarn cache clean

RUN yarn install

CMD ["yarn", "start"]
