FROM node:16-slim

ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY "package.json" "./"
RUN yarn install
COPY "server" "./server"

RUN chown -R node /usr/src/app
USER node

EXPOSE 3001
CMD ["node", "server/index.js"]