const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const router = require('express').Router();

const WooCommerce = new WooCommerceRestApi({
    url: 'http://localhost/wordpress/wordpress/',
    consumerKey: 'ck_75ec4bea33a93d837b6ff5f1e5155bfd2211fc32',
    consumerSecret: 'cs_b027762ad9a15b52142644e1219c147132d41fa9',
    version: 'wc/v3'
  });
  var response;
router.get('/product', async (req, res)=>{
    try{
        WooCommerce.get("products")
        .then((response) => {
            console.log(response.data);
            res.json(JSON.parse(JSON.stringify(response.data)));
          })
    }catch(err){
        res.json(err);
    }
})
module.exports = router;