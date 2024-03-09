    const express = require('express')  // importing express server
    const app = express();             //accuring whatever is thier in express into app
    const db = require('./db');        // importing db connection

    const passport = require('./auth');

    const bodyparser = require('body-parser');    // bodyware , a express middleware
    app.use(bodyparser.json());  //req.body
     
      // Creating a middleware which will loged the date and time of user hit at the website

      const logRequest = (req,res,next) =>{
        console.log(`[${new Date().toLocaleString() }] Request made to : ${req.originalUrl}`);
           next();  //move to next phase
       }
        app.use(logRequest);


   
    //  Authentication 

   app.use(passport.initialize());        
                                                    /* local Strategy*/
    const localAuthMiddleware = passport.authenticate('local', {session:false});



                                
    app.get('/', localAuthMiddleware,function (req, res) {     //get is a mehtod of sharing data and is used to request data from server and '/' when '/' is used after any address and press enter 
      res.send('Hello World');             //respond will be send saying hello world at webbrowser at port no 3000
    });






     // importing router files

    const personRouter = require('./Routers/personRouter');
    // using route
       app.use('/person',localAuthMiddleware,personRouter);

    const menuRouter = require('./Routers/menuRouter');
       app.use('/menu',menuRouter);


   

    
              
    

    app.listen(3000 , () =>{
        console.log('connection established');
        console.log("server is listining on port 3000");
    });   