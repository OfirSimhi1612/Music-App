FROM node:12

WORKDIR /usr/app/server

ADD ./package.json /package.json

RUN npm install
RUN chmod +x wait-for-it.sh

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]


