# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN ./node_modules/@angular/cli/bin/ng build 

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.12
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

