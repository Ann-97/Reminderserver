//import express
const express=require('express')

//import dataservice
const dataService=require('./services/data.service')


//import jsonwebtoken
const jwt=require('jsonwebtoken')

//import cors
const cors=require('cors')

//server creation
const app=express()

//use cors
app.use(cors({
    origin:'http://localhost:4200'
}))


//to parse json data
app.use(express.json())



//resolving REST API 
//GET-to read data
app.get('/',(req,res)=>{
    res.send("GET REQUEST")
})

//POST-to create data
app.post('/',(req,res)=>{
    res.send("POST REQUEST")
})

//PUT-to update/modify data
app.put('/',(req,res)=>{
    res.send("PUT REQUEST")
})

//PATCH-to partially update data
app.patch('/',(req,res)=>{
    res.send("PATCH REQUEST")
})


//DELETE-to delete data
app.delete('/',(req,res)=>{
    res.send("DELETE REQUEST")
})


//jwtmiddleware
const jwtMiddleWare=(req,res,next)=>{
    try 
    { const token=req.headers["x-access-token"]
      const data=jwt.verify(token,'secret123456')
      req.currentUid=data.currentUid
      next()
  }
  catch{
      res.status(401).json({
          statusCode:401,
          status:false,
          message:"please log in"
      })
  }
  }

//REGISTER API
app.post('/register',(req,res)=>{
    //asynchronous
    dataService.register(req.body.uname,req.body.uid,req.body.password)
    .then(result=>{

        res.status(result.statusCode).json(result)
    })
    
    
})

//LOGIN API
app.post('/login',(req,res)=>{
    console.log(req.body.pswd);
    dataService.login(req.body.uid,req.body.pswd)
    .then(result=>{
        res.status(result.statusCode).json(result)

    })
     
})

//addEvent API
app.post('/addEvent',(req,res)=>{
    
    dataService.addEvent(req.body.uid,req.body.eventdate,req.body.eventname)
    .then(result=>{
    res.status(result.statusCode).json(result)
    
})
})


// viewevent api call

app.post('/viewevent',(req,res)=>{
    dataService.viewevent(req.body.uid)
    .then(result=>{
        res.status(result.statusCode).json(result)
     })
})


//set port number
app.listen(3000,()=>{
    console.log("Server started at 3000");
})