FROM node:22.18.0
RUN npm install swagger-typescript-api@13.2.16 -g
RUN mkdir /local
WORKDIR /local
COPY . .
CMD ["sh", "generate.sh"]