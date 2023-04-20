#stage 1
FROM node:18 as node
WORKDIR /app
COPY . /app
RUN npm install --force
RUN npm run build --

#stage 2
FROM nginx:alpine
#EXPOSE 80
#EXPOSE 443
COPY --from=node /app/dist/* /usr/share/nginx/html