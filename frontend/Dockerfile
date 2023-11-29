FROM node:18.18.0

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

# FROM nginx:1.15.8-alpine


# COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 4200

CMD ["npm", "start"]

