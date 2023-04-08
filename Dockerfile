# base image
FROM node:16-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production=false

# copy app files
COPY . .

# build the app
RUN yarn build

# set environment variables
ENV NODE_ENV production

# expose port
EXPOSE 3000

# start the app
CMD ["yarn", "start"]
