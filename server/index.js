const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

const WooRoute = require('./routes/WooCommerceRoutes.js');

app.use('/', WooRoute);

app.listen(3000, ()=> console.log("Server connected!"));