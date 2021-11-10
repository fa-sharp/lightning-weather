FROM node:16-alpine as builder
RUN apk add --no-cache python3 make g++
# RUN apk add g++ make py3-pip (alternative python install)
RUN yarn add express better-sqlite3

# multistage build (copy node_modules from above without including toolchain)
FROM node:16-alpine as app

ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=builder "node_modules" "./node_modules"
COPY "package.json" "./"
COPY "server" "./server"

EXPOSE 3001
RUN chown -R node /usr/src/app
USER node
CMD ["node", "server/index.js"]