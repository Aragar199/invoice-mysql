FROM node:14

WORKDIR /invoice-mysql/invoicemysql-app
COPY /invoicemysql-app/package.json .
RUN npm install
COPY . .
CMD npm start