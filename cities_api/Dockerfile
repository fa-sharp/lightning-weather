FROM node:16-alpine
# Need python for node-gyp (required for sqlite package)
RUN apk add g++ make py3-pip
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY "package.json" "./"
COPY "server" "./server"
RUN npm install --production && mv node_modules ../
EXPOSE 3001
RUN chown -R node /usr/src/app
USER node
CMD ["node", "server/index.js"]
