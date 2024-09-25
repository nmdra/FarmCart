FROM node:22-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 3001

COPY . .

CMD ["npm", "run", "dev"]