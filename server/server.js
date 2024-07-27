const express =require('express')
const cors =require('cors')
require('dotenv').config()
require('./config/db');


const authRoutes =require('./routes/auth')
const donorRoutes =require('./routes/donors')
const requestRoutes =require('./routes/requests')

const app =express();

app.use(express.json());
app.use(cors());


app.use('/auth',authRoutes)
app.use('/donors',donorRoutes)
app.use('/requests',requestRoutes)

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`port is up and running ${PORT}`)
})  



