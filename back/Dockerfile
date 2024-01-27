FROM node:20-alpine

WORKDIR /back

COPY . .

RUN npm cache clear --force

RUN npm install

CMD ["npm", "start"]
