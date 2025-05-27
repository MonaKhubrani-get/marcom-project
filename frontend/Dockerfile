# Development Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]


## Production frontend Dockerfile (كما كتبته):
# FROM node:18 as builder
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build

# FROM nginx:alpine
# COPY --from=builder /app/build /usr/share/nginx/html
# COPY default.conf /etc/nginx/conf.d/default.conf
