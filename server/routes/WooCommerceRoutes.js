const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const router = require('express').Router();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const WooCommerce = new WooCommerceRestApi({
    url: process.env.URL,
    consumerKey: process.env.CONSUMERKEY,
    consumerSecret: process.env.CONSUMERSECRET,
    version: process.env.VERSION
  });
// site produkti

const customerModel = require('../models/customers.js');

router.post('/register', async (req, res)=>{
    try {
        const customer = new customerModel({
            name: req.body.name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            billing: {},
            shipping: {}
        })
        const saveItem = await customer.save();
        res.status(200).json(saveItem)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/login', async (req, res) =>{
    try {
        const user = await customerModel.findOne({username: req.body.username});
        console.log(user);

        if(!user){
            res.status(401).json("wrong credentials");
            return;
        }

        const password = user.password;

        if(password !== req.body.password){
            res.status(401).json("wrong password");
            return;
        } 
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/user/:id', async(req, res) =>{
    try {
        console.log(req.params.id);
        const user = await customerModel.findById(req.params.id);
        console.log(user);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.put('/updateuser/:id', async (req, res) =>{
    try {
        const updateUser = await customerModel.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json(updateUser);
    } catch (err) {
        res.status(500).json(err);   
    }
})

router.get('/custom', async (req, res)=>{
    try {
        
        const allCustomers = await customerModel.find({})
        console.log(allCustomers);
        res.status(200).json(allCustomers);
    } catch (err) {
        res.json(err);   
    }
})

router.get('/product/page/:pageNumber', async (req, res)=>{
    try{
        WooCommerce.get("products?per_page=10&page="+req.params.pageNumber)
        .then((response) => {
            console.log(response.data);
            res.json(response.data);
          })
    }catch(err){
        res.json(err);
    }
})


router.get('/products/category/:id', async (req, res)=>{
    try{
        WooCommerce.get("products?category="+req.params.id)
        .then((response) => {
           // console.log(response.data);
            res.json(response.data);
          })
    }catch(err){
        res.json(err);
    }
})

router.get('/products/search/:queryString', async (req, res)=>{
   // console.log(req.params.queryString);
    try{
        WooCommerce.get("products?search="+req.params.queryString)
        .then((response) => {
           // console.log(response.data);
            res.json(response.data);
          })
    }catch(err){
        res.json(err);
    }
})

// da se povlece 1 produkt
router.get('/product/:id', async (req, res)=>{
    try{
        WooCommerce.get("products/"+req.params.id)
        .then((response) => {
       // console.log(response.data);
        res.json(response.data);
  })
    }catch(err){
        res.json(err);
    }
})

//site useri

router.get('/customer', async (req, res) =>{
    try {
        WooCommerce.get("customers")
    .then((response) => {
   // console.log(response.data);
    res.json(JSON.parse(JSON.stringify(response.data)));
  })
    } catch (err) {
        res.json(err)
    }
})

router.post('/customers', async(req, res)=>{
    
    try{
        WooCommerce.post("customers", req.body)
        .then((response) => {
      //      console.log(response.data);
          })
    }catch(err){
        res.json(err)
    }
})

router.post('/orders', async(req, res) =>{
    try {
        WooCommerce.post('orders', req.body)
        .then((response) =>{
          //  console.log(response.data);
        })
    } catch (err) {
        res.json(err)
    }
})

router.get('/categories', async(req, res) =>{
    try{
        WooCommerce.get('products/categories')
        .then((response)=>{
            console.log(response.data);
            res.json(response.data);
        })
    }catch(err){
        res.json(err)
    }
})

module.exports = router;