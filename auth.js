const Person = require('./Models/person');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;





  // creating Authentication by using passport and local Strategy ,local Strategy means by sunig username and password

passport.use(new LocalStrategy(async(USERNAME,password,done) => {
    try {
       
          const user = await Person.findOne({username : USERNAME}); 
          if(!user){
              return done(null , false,{message:'Incorrect username'});
            }  
            // const isPasswordMatch = user.password === password ?true:false;
            const isPasswordMatch = await user.comparePassword(password);

            if(isPasswordMatch){
             return done(null,user);
            }else{
             return done(null,false,{message:'Incorrect password'});
            }
    } 
     catch (error) {
        return done(error);
    }
}))

module.exports = passport;
