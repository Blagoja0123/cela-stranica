const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
    name:{type: String},
    last_name:{type: String},
    username:{type: String, unique: true},
    email:{type: String, unique: true},
    password:{type: String},
    billing: {
        first_name:{type: String, default: ""},
        last_name:{type: String, default: ""},
        address_1:{type: String, default: ""},
        city:{type: String, default: ""},
        state:{type: String, default: ""},
        postcode:{type: String, default: ""},
        country:{type: String, default: ""},
        email:{type: String, default: ""},
        phone: {type: String, default: ""},
    },
    shipping: {
        first_name:{type: String, default: ""},
        last_name:{type: String, default: ""},
        address_1:{type: String, default: ""},
        city:{type: String, default: ""},
        state:{type: String, default: ""},
        postcode:{type: String},
        country:{type: String, default: ""},
    },
    order_history: {type: Array}
})

module.exports = mongoose.model('customer', customerSchema);