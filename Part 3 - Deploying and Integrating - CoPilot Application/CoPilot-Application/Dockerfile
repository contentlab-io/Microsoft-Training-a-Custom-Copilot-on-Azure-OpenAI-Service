FROM node:8

ENV PORT 80
EXPOSE 80

RUN mkdir -p /src

# Create app directory
WORKDIR /src
COPY ["package*.json","./"]

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

CMD ["npm", "start"]