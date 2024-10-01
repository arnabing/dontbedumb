FROM node:alpine

WORKDIR /home/perplexica

COPY . .

RUN yarn install
RUN yarn build

CMD ["yarn", "start"]