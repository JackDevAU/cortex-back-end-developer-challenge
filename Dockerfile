FROM node:alpine
COPY . .
RUN npm install

CMD npm run start
EXPOSE 3000
