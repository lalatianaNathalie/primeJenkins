const express = require('express');
const cors = require('cors');

const sequelize = require('./config/database');

const messageRoutes = require('./routes/messageRoutes');
const employeRoutes = require('./routes/employeRoutes');
const clientRoutes = require('./routes/clientRoutes');
const conteneurRoutes = require('./routes/conteneurRoutes');
const suiviHBLRoutes = require('./routes/suiviHBLRoutes');
const suiviHWBRoutes = require('./routes/suiviHWBRoutes');
const transAerienneRoutes = require('./routes/transAerienneRoutes');
const transMaritimeRoutes = require('./routes/transMaritimeRoutes');
const MAWBRoutes = require('./routes/MAWBRoutes');
const MBLRoutes = require('./routes/MBLRoutes');
const HAWBRoutes = require('./routes/HAWBRoutes');
const HBLRoutes = require('./routes/HBLRoutes'); 

const app = express();


app.use(express.json());
app.use(cors())

// Log des requêtes entrantes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
}); 

app.use('/message', messageRoutes);
app.use('/employe', employeRoutes);
app.use('/client', clientRoutes); 
app.use('/conteneur', conteneurRoutes); 
app.use('/suiviHBL', suiviHBLRoutes);  
app.use('/suiviHAWB', suiviHWBRoutes);   
app.use('/transMaritime', transMaritimeRoutes); 
app.use('/transAerienne', transAerienneRoutes);
app.use('/mbl', MBLRoutes);  
app.use('/mawb', MAWBRoutes);  
app.use('/hbl', HBLRoutes);   
app.use('/hawb', HAWBRoutes);  

// Synchroniser la base de données sans supprimer les tables existantes
sequelize.sync({ force:false}) 
  .then(() => console.log('Database synced'))
  .catch(err => console.log('Error syncing database', err));


// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack); // Affiche l'erreur dans la console
  res.status(500).json({ message: 'Something broke!', error: err.message }); // Renvoie l'erreur dans la réponse
});

module.exports = app;
