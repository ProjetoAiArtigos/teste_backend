# Imagem base
FROM node:18

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos para o contêiner
COPY package*.json ./
COPY . .

# Instalar dependências
RUN npm install

# Expor a porta do servidor
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]
