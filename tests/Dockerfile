FROM mcr.microsoft.com/playwright:v1.60.0-noble
COPY tests /tests
COPY package.json /
COPY package-lock.json /
COPY playwright.config.js /

RUN npm ci && npx playwright install --with-deps && npm install nock && npm install ajv