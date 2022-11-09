FROM node:14

WORKDIR /invoicemysql-app
COPY package.json .
RUN npm install
COPY . .
CMD npm start