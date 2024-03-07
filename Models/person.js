const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({

      name: {
           type:String,
           required:true
           },
         
       age:{
           type:Number  
           },
         work:{
             type: String,
             enum:['doctor','student','engineer']
         }     ,
         salary:{
               type:Number
         },
         email:{
              type:String,
              required:true,
              unique:true
         }
})

  // Now from above schema we are going to create model

  const person = mongoose.model('person',personSchema);
  module.exports = person;