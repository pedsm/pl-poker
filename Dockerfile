FROM node:18-alpine

# Create app directory
WORKDIR /app

COPY /apps/next .

RUN yarn install

RUN yarn build

ENTRYPOINT ["yarn", "start"]