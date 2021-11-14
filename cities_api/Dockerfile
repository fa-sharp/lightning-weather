FROM node:16-slim as builder
RUN yarn add express better-sqlite3

# multistage build (copy node_modules from above without including toolchain)
FROM node:16-slim as app

ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=builder "node_modules" "./node_modules"
COPY "package.json" "./"
COPY "server" "./server"

EXPOSE 3001
RUN chown -R node /usr/src/app
USER node
CMD ["node", "server/index.js"]