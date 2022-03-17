const express = require("express");

const adminController=require("../controllers/admin");

const path = require("path");

// const rootDir = require("../utils/path");
const router = express.Router();

//   /admin/add-product  =>GET
router.get("/add-product", adminController.getAddProduct);     //For MVC pattern the callback function is written in the  controllers folders

//   /admin/products  =>GET
router.get("/products",adminController.getProducts);  

//   /admin/add-product  =>POST
router.post("/add-product",adminController.postAddProduct );

router.get("/edit-product/:productId", adminController.getEditProduct);   //passing productId as parameter  //If we click on Edit button in Admin products

router.post("/edit-product",adminController.postEditProduct);  //By clicking the Update Product in Edit Product

router.post("/delete-product",adminController.postDeleteProduct);

module.exports=router;
// exports.routes = router;
// exports.products = products;
