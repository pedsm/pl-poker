FROM node:16-alpine

# Create app directory
WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

RUN mv ./apps/frontend/dist ./apps/backend/dist

ENTRYPOINT ["yarn", "start"]