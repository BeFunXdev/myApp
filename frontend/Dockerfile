FROM node:22

WORKDIR /app

COPY package.json .

RUN yarn --network-timeout 100000

COPY . .

RUN yarn build

#RUN chown -R 1000:1002 .

EXPOSE 3000

CMD ["yarn", "start"]
#CMD ["yarn", "dev"]