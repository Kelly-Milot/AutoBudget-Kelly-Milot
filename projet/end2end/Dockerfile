FROM cypress/factory

WORKDIR /app

COPY ./package.json .

RUN npm i

COPY ./cypress.config.ts .
COPY ./tsconfig.json .