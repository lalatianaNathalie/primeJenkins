# Étape de build
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Étape de production
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
