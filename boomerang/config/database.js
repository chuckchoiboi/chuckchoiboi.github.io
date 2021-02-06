const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect( process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then( () => console.log('MongoDB connected...'))
.catch( (err) => console.log( 'MongoDB connection error :(', err ) );

mongoose.connection.on( 'disconnected', (err) => console.log(err) );

module.exports = require('../models')
