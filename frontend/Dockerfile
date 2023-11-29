FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 4200

RUN npm run build

# FROM nginx:1.15.8-alpine


# COPY --from=node /app/dist/frontend /usr/share/nginx/html


CMD ["npm", "start"]

