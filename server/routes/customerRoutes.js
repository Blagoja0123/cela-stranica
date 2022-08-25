const router = require('express').Router();

const customerModel = require('../models/customers');

router.post('customer', async (req, res)=>{
    try {
        const newItem = new customerModel({
            name: req.body.name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        const saveItem = await newItem.save();
        res.status(200).json(saveItem);
    } catch (err) {
        console.log('error');
    }
})

module.exports = router;