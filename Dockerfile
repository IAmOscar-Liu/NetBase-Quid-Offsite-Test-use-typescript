FROM node:16 AS BUILD_SERVER

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build

RUN rm -rf node_modules

FROM node:16 AS BUILD_OPTIMIZED_SERVER

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=BUILD_SERVER /app/dist ./dist

EXPOSE 5000
CMD [ "node", "dist/index.js" ]