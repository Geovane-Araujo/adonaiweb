FROM node:lts-alpine as build
WORKDIR /app
COPY dist ./dist

FROM nginx:stable-alpine as prod-stage
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]