const mongoose = require('mongoose');

//Define the MongoDB connection URL

const mangooseURL = 'mongodb://0.0.0.0:27017/MyDatabase';

//Set upthe MongoDB connection

mongoose.connect(mangooseURL,{
    useNewUrlParser : true ,
    useUnifiedTopology : true
  })

  //Get the default connection
  // Mongoose maintain a default connection object represent the MongoDB connection

  const db = mongoose.connection;

  // Define event listener for database connection

  db.on('connected' , () =>{
    console.log('connected to MongoDB server');
  })

  db.on('error' , (err) =>{
    console.log('Faced Error While connecting Monodb' , err);
  })

  db.on('disconnected' , () =>{
    console.log(' MongoDB Disconnected');
  })

  //Export the Database connection and import it into server
  module.exports = db;











 
