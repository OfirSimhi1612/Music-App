FROM node:12

WORKDIR /server

COPY package*.json ./

RUN npm install
RUN npm rebuild bcrypt --build-from-source


COPY . ./

EXPOSE 8080

CMD [ "npm", "run", "dev" ]


