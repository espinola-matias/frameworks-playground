FROM node:20-alpine

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copiar manifiestos de dependencias
COPY package*.json ./

# Instalar dependencias (incluye nodemon de devDependencies para desarrollo)
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto de Express
EXPOSE 3900

# Comando de ejecución en modo desarrollo
CMD ["npm", "run", "dev"]
