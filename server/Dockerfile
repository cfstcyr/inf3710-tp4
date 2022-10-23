FROM node:18-alpine as base

ARG PORT=3000

WORKDIR /src
EXPOSE $PORT
ENV PORT=$PORT
CMD ["npm", "start"]