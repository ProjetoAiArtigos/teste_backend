# Imagem base
FROM node:18

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos para o contêiner
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar demais arquivos para o contêiner
COPY . .

# Expor a porta do servidor
EXPOSE 3001

# Comando para iniciar o servidor
CMD ["npm", "start"]
