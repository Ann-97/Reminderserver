
//import db
const db=require('./db')

//jsonwebtoken import
const jwt = require('jsonwebtoken')



 //register-index.js will give uname,acno,password-asynchronous
  const register= (uname,uid,password)=> {
    //asynchronous
   return db.Event.findOne({uid})
   .then(event=>{
     
    if(event){//already exist
      return {
        statusCode:401,
        status:false,
        message:"User Id already exist"
       
      }

    }
    else{
      const newEvent=new db.Event({
         uid,
        uname,
        password,
        
        event:[]
       

      })
      newEvent.save()
      return {
        statusCode:200,
        status:true,
        message:"Successfully registered.please log in"
       
      }
    }

   })
   
  }

   //login
const login=(uid,pswd)=>{

  return db.Event.findOne({uid,password:pswd})
  .then(event=>{
    if(event){
     currentEvent=event.uname
     currentUid=uid
     //token generate
     const token = jwt.sign({
       currentUid:uid
     },'secret123456')
 
     //already exist in db
     return  {
       statusCode:200,
       status:true,
     message:"login successfull",
     currentUid,
     currentEvent,
     token
      
     }
    }
    else{
   
     return {
      statusCode:401,
      status:false,
    message:"Invalid credentials"
     
    }
    }
  }) 
 }

 //eventdetails
const addEvent=(uid,eventdate,eventname)=>{
  // var eventdate = eventdate
  
console.log(eventdate,eventname);
  return db.Event.findOne({uid})
  .then(result=>{
    if(result){
      result.event.push({
        eventdate,
        eventname
    })
    result.save()

      return {
        statusCode:200,
        status:true,
      message: "successfully added the event"
       
      }
    }
    else{
    return {
      statusCode:401,
      status:false,
    message:"Invalid entry"
     
    }
  }
  })
}

   // viewevent

   const viewevent=(uid)=>{

    return db.Event.findOne({uid})

    .then(result=>{


        if (result) {
            return{
                statusCode: 200,
                status: true,
                event:result.event
            }

        }
        else{
            return{
                statusCode: 401,
                status: false,
                message: "please login again "

            }
        }
    })
  }

 
 

  

//export
module.exports={
    register,
    login,
    addEvent,
    viewevent
   
    
   
}