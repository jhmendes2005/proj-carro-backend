# Imagem base
FROM node:20-alpine

# Diretório da aplicação
WORKDIR /app

# Copia package.json e instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Build do Nest
RUN npm run build

# Porta exposta
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "run", "start:prod"]
