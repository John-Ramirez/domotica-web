# Use el nodo v4 como la imagen base.
FROM node:4

# Agregue todo en el directorio actual a nuestra imagen, en la carpeta 'aplicación'.
ADD . /app

# Instalar dependencias
RUN cd /app; \  
    npm install --production

# Exponga su puerto de servidor.
EXPOSE 8080

# Ejecuta aplicación
CMD ["node", "/app/index.js"]
