# Use Node.js 16 as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Run prisma generate
RUN npx prisma generate

RUN npx prisma migrate deploy

# Build the NestJS application
RUN npm run build

# Expose the port on which the NestJS application will run
EXPOSE 3000

# Command to run the NestJS application
CMD ["node", "dist/main.js"]