FROM node:20-alpine

# Install OpenSSL and other required dependencies
RUN apk add --no-cache openssl libc6-compat

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies including dev dependencies
RUN npm install

COPY . .

# Install TypeScript globally
RUN npm install -g typescript ts-node

# Generate Prisma client
RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"] 