    const express = require('express')  // importing express server
    const app = express()   ;             //accuring whatever is thier in express into app
    const db = require('./db');        // importing db connection

    const bodyparser = require('body-parser');    // bodyware , a express middleware
    app.use(bodyparser.json());  //req.body
     
 
   
     
 


    app.get('/', function (req, res) {     //get is a mehtod of sharing data and is used to request data from server and '/' when '/' is used after any address and press enter 
      res.send('Hello World');             //respond will be send saying hello world at webbrowser at port no 3000
    });


     // importing router files

    const personRouter = require('./Routers/personRouter');
    // using route
       app.use('/person',personRouter);

    const menuRouter = require('./Routers/menuRouter');
       app.use('/menu',menuRouter);


   

    
              
    

    app.listen(3000 , () =>{
        console.log('connection established');
        console.log("server is listining on port 3000");
    });   