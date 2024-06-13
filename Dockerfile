# Take nodejs image 
FROM        node:16.16.0-alpine

# Set working directory
WORKDIR     /server

# Copy the artefacts
COPY        . ./

# RUN npm ci --only=production
# RUN         npm ci

# Port where your app will run
EXPOSE      3000

# Entry point that will start the Microservice in Docker Container
ENTRYPOINT  ["npm", "start"]
