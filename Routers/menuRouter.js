const express = require('express');
const router = express.Router();
const menuI = require('./../Models/Menus');     // ./ refer to current directory and ../ refer to its parent directory
const { findByIdAndDelete } = require('../Models/person');

 router.post('/',async (req,res) =>{   
    try {
          const itemData = req.body;
          const Data = new menuI(itemData);  
          const response = await Data.save();
          console.log("data saved")
          res.status(200).json(response);
                          
            } 

     catch(err){
              console.log(err);
              res.status(500).json({error:'Inter server Problem'});
                }
        }) ;   




      router.get('/',async (req,res) =>{
         try {
             const data = await menuI.find();
             console.log("data Fetched")
             res.status(200).json(data);
             } 
          catch(err){
              console.log(err);
              res.status(500).json({error:'Internal server error'});
                   }
          });

               //Paramaterised API call

     router.get('/:tasteType',async(req,res) =>{
        try{
            const tasteType = req.params.tasteType; //Extract the  tasteType from the URL parameter
            if( tasteType == 'sweets' || tasteType == 'bitter' ||  tasteType == 'spicy'){  // Handling validation 
                    const response = await menuI.find({taste:tasteType});
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
    })    ;

  // updating menu based on id and aslo whole details related to particular id

    router.put('/:id', async(req,res) =>{
          try {
                const menuId = req.params.id;
                const updateMenuData = req.body;

                const response = await menuI.findByIdAndUpdate(menuId,updateMenuData,{
                      new : true,
                      runValidators:true
                });

                if(!response){
                      return res.status(200).json({error:'Menu not found'});
                }
                console.log('Record related to given id is updated');
                res.status(200).json(response);

            }
          catch (error) {
            console.log(err)
            res.status(500).json({error:'Internal server problem'});
            }
            
          });

            // For deleteing menu ,searching based on id

          router.delete('/:data_item' , async(req,res) =>{
              try {
                   const data = req.params.data_item;
                    const response =  await menuI.findByIdAndDelete(data);
                    
                    if(!response){
                        return res.status(404).json({error:'Item not found'});
                    }

                    console.log('Record related to given id is deleted');
                    res.status(200).json(response);
                
              } catch (error) {
                console.log(err)
            res.status(500).json({error:'Internal server problem'});
            }
              
          })
   

          module.exports = router;