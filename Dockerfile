FROM alpine:3.15
RUN apk add --no-cache nodejs yarn

WORKDIR /app
COPY package.json /app
RUN yarn

COPY . /app
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]