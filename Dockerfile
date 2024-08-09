FROM node:20.0.0-alpine

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

COPY ./dist ./dist

CMD ["yarn", "run", "start:dev"]






