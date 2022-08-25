const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

app.use(cors());


const WooRoute = require('./routes/WooCommerceRoutes.js');


mongoose.connect(process.env.MONGOLOGIN)
.then(()=>console.log("Database connected"))
.catch(err=>console.log("err"))

app.use('/', WooRoute);

app.get('/', (req, res)=>{
    res.json({message: "Hello World"})
})

app.listen(3000, ()=> console.log("Server connected!"));