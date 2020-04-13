FROM node:12.0-slim

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY ./server/package.json /usr/src/app/
COPY ./server/package-lock.json /usr/src/app/
RUN npm ci

# Bundle app source
COPY ./server/  /usr/src/app/

CMD ["npm", "start"]
