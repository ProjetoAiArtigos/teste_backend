# Use uma imagem base com Node.js 18
FROM node:18

# Define o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copia os arquivos de configuração do projeto
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código para o contêiner
COPY . .

# Define a variável para resolver o problema do OpenSSL
ENV NODE_OPTIONS=--openssl-legacy-provider

# Expõe a porta usada pelo app
EXPOSE 3000

# Comando para iniciar o app
CMD ["npm", "start"]
