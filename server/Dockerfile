FROM node:12

WORKDIR /usr/app/server

COPY . .

RUN npm install
RUN chmod +x wait-for-it.sh

EXPOSE 8080

CMD [ "npm", "run", "dev" ]


