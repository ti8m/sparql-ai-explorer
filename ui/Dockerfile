# Use the official Node.js 20 image
FROM node:20.10.0-alpine AS base


WORKDIR /src

# build stage
FROM base AS build

# Copy the package.json and package-lock.json
COPY --link package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY --link . .

ARG NUXT_AI_API_PATH
ARG NUXT_FUSEKI_API_PATH
ENV NUXT_AI_API_PATH=${NUXT_AI_API_PATH}
ENV NUXT_FUSEKI_API_PATH=${NUXT_FUSEKI_API_PATH}

# Build the Nuxt application
RUN npm run build

# RUN stage
FROM base

ENV NODE_ENV=production
EXPOSE 3000

# Copy the output from the build stage
COPY --from=build /src/.output /src/.output

# Define the command to run the application
CMD [ "node", ".output/server/index.mjs" ]
