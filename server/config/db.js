const mongoose =require ('mongoose'); 
mongoose.connect(process.env.mongoUrl)
    .then(()=>{
        console.log("connected to db")
    })
    .catch((error)=>{
        console.log("connection failed")
    })
