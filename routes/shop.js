const express = require("express");         //routes  in this controllers are initialized  and methods are called

const shopController=require("../controllers/shop");   //Controllers

// const path = require("path");
// const rootDir = require("../utils/path");

const router = express.Router();  //Declared as Router and can be used in app.js

// const adminData = require("./admin");

router.get("/", shopController.getIndex);

router.get("/products",shopController.getProducts);

router.get("/cart",shopController.getCart);
// router.get("/products/delete"); 

router.post("/cart",shopController.postCart)
router.post("/cart-delete-item",shopController.postCartDeleteProduct)
router.get("/products/:productId",shopController.getProduct);   //products/2012
router.post("/create-Order",shopController.postOrder);
// router.get("/checkout",shopController.getCheckout);

router.get("/orders",shopController.getOrders);

module.exports = router;
