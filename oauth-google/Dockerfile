FROM node:10-alpine

ENV DB_NAME auctor
ENV DB_USER post
ENV DB_PASS test
ENV DB_HOST 192.168.0.4:27017

ENV ADDRESS_POST https://post.byeoru.com
ENV ADDRESS_USER https://user.byeoru.com
ENV ADDRESS_OAUTHGOOGLE https://oauthgoogle.byeoru.com

ENV WHOAMI oauth-google

EXPOSE 8002

WORKDIR /usr/byeoru
ADD ./package.json .
RUN yarn install --production

COPY ./src/ ./src/

CMD [ "yarn", "start" ]