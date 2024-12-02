
FROM node:16


WORKDIR /usr/src/app


COPY . .

# Install dependencies
RUN npm install


EXPOSE 3000


ENV NODE_ENV=production
ENV PORT=3000



# Start the app
CMD ["npm", "start"]


