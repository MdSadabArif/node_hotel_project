const express = require('express');
const router = express.Router();
const Person = require('./../Models/person'); 


//router to send data from client to server and then saved it at database
router.post('/',async(req,res)=> {     //post method to send the data from client to server so that server saveed it database
    try{
        const data = req.body;  //Assuming the data is in request body
        const newPerson = new Person(data);  //creating a new Person document using Mongoose model
        const response = await newPerson.save(); // save the newPerson to database
        console.log('data saved');
        res.status(200).json(response);
       } 
    catch (err) {
      console.log(err);
      res.status(500).json({error:'Internal server Error'});
      
                 }   
            });


//router to fetch data from server to client 
     router.get('/ ',async(req,res) =>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
        }
    catch(err){
            console.log(err);
            res.status(500).json({error:'Internal server problem'});
            }

    });
   
      //Paramaterised API call

     router.get('/:workType',async(req,res) =>{
        try{
            const workType = req.params.workType; //Extract the workType from the URL parameter
            if(workType == 'doctor' ||workType == 'engineer' || workType == 'student'){  // Handling validation 
                    const response = await Person.find({work:workType});
                    console.log('response fetched');
                    res.status(200).json(response);
            }
            else{
                res.status(404).json({error:'invalid work type'});
            }
            
        }
        catch(err){
            console.log(err)
            res.status(500).json({error:'Internal server problem'});
            }
    })    

    router.put('/:id',async(req,res) => {    // here id is a variable ,you can take any
         
        try{
            const personId = req.params.id;  //personId are passed through parameter and is fetched by params and also here id is a variable ,you can take any
            const updatePersonData = req.body;   // the other whole info related to that particular id is send and req.body , what it does , you know 
  
             const response = await Person.findByIdAndUpdate(personId,updatePersonData,{    //findByIdAndUpdate is method which finds and update and its take 3 parameter 
                    new : true,      // update hone ke bad jo document ayega wo response mein jayega
                    runValidators:true                                      // it says mongoose to validate the information that client is sending according to schema which has been created
              })

              if(!response){                                  
                  return res.status(404).json({error:'Person not found'});
                   }

                   console.log('data updated');
                   res.status(200).json(response);

          }
          catch(err){
            console.log(err)
            res.status(500).json({error:'Internal server problem'});
            }
          
    })

    router.delete('/:id' ,async(req,res) => {
        try{
            const personId = req.params.id;

            const response = await Person. findByIdAndDelete(personId);

            if(!response){                                  
                return res.status(404).json({error:'Person not found'});
                 }

                 console.log('person data deleted successfully');
                 res.status(200).json({error:'person data deleted successfully'});
        }
        catch(err){
            console.log(err)
            res.status(500).json({error:'Internal server problem'});
        }
    })

    // comment added for testing purpose

    module.exports = router;