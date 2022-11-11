# pull official base image
FROM node:14-alpine

# set working directory
WORKDIR /app


# install app dependencies
#copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Installs all node packages
RUN npm install

# Copies everything over to Docker environment
COPY . ./

CMD [ "node","server.js" ]
