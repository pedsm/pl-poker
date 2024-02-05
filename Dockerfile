# Specify the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY apps/next/package*.json ./

# Install dependencies
RUN yarn install

# Copy the app code to the working directory
COPY apps/next/ ./

# Build the Next.js app
RUN yarn build

# Expose the port that the app will run on
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]
