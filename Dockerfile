FROM node:17-alpine
WORKDIR /usr/src/medal-discord
COPY package.json ./
RUN npm install
COPY medal.js ./
CMD ["npm", "start"]