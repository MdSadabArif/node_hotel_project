const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
         },
         username:{
                type:String,
                required:true
         },
         password :{
                type:String,
                required:true
         }
})

  personSchema.pre('save',async function(next){
    const person = this;
    // Hash the password only if has been modified (or is new)

    if(!person.isModified('password')) return next();

    try{
        const salt = await bcrypt.genSalt(10);  // is responsible for generating a salt,which is a random string 

        //hash password

        const  hashedPassword = await bcrypt.hash(person.password,salt);

        //Override the plain password with the hashed one
        person.password = hashedPassword ;
        next(); 
    }
    catch(err){
      return next(err);
    }
  })


  personSchema.methods.comparePassword = async function(candidatePassword){
         try {
             const isMatch = await bcrypt.compare(candidatePassword,this.password); //bcrypt.cpmare will extract salt from stored hassedPassword and it will add that extract salt to the newly entered password and again it will hassed enter password+extracted salt and will match with stored password
              return isMatch;
         } catch (error) {
               throw err;          
         }
  }

  // Now from above schema we are going to create model

  const person = mongoose.model('person',personSchema);
  module.exports = person;