const mongoose = require('mongoose');
const menu = new mongoose.Schema({

    name:{
        type:String,
        required:true
         },
     price:{
          type:Number,
          reqiured:true
          },
       taste:{
           type:String,
           enum:['sweets','bitter','spicy'],
           required:true
            } ,
        is_drink:{
                  type:Boolean,
                  default:false
            },
        ingredients:{
               type:[String],    //Arry of string
               default:[]
              },
         no_sales:{
                   type:Number,
                  default:0
                    }     

})


const menuItem = mongoose.model('menuItem',menu);
module.exports = menuItem;