FROM node:16.15 as base
WORKDIR /home/node/app
COPY package*.json ./

FROM base as dependencies
RUN npm ci --only=production

FROM dependencies as dev_dependencies
RUN npm install

FROM dev_dependencies as builder
COPY . .
RUN npm run build


FROM base as release
COPY --from=dependencies /home/node/app/node_modules ./node_modules
COPY --from=builder /home/node/app/dist ./dist

EXPOSE 3000
CMD npm run start:prod
