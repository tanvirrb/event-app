FROM node:16.19-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .
RUN cd ./frontend && npm install
EXPOSE 3000 3001
