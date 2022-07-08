FROM node:16

WORKDIR /Users/adasddasd12/Desktop/vsProj/payhere/02-PayHere/

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "run", "start"]