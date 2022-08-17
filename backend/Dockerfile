FROM node:16.13.2
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
EXPOSE 5000
CMD npm start