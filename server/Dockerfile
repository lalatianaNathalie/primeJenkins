# Utiliser l'image officielle de Node.js
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Supprimer les node_modules existants avant d'installer les dépendances
RUN rm -rf node_modules

# Installer les dépendances Node.js
RUN npm install

# Supprimer bcrypt et installer bcryptjs
RUN npm uninstall bcrypt && npm install bcryptjs

# Copier le reste de l'application dans le conteneur
COPY . .

# Exposer le port 3000 si nécessaire
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
