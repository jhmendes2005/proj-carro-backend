FROM node:20-alpine

WORKDIR /app

# Copia package.json e instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante do projeto
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

# Build da aplicação Nest
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
