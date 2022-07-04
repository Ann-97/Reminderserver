


//import mongoose
const mongoose=require('mongoose')


mongoose.connect('mongodb://localhost:27017/ReminderServer',{
    useNewUrlParser:true
})

//create model 
const Event=mongoose.model('Event',{
    uid:String,
    uname:String,
    password:String,
    event:[]
    })
    

    //export event
module.exports={
    Event
}