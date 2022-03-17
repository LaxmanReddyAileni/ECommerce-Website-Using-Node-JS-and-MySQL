const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Cart = sequelize.define('cart',{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey : true
  }
});

module.exports = Cart;
































/*const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  //Only ONE CART SO No need of constructor

  static addProduct(id, productPrice) {
    //Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
//Comment The below if while adding to cart and uncomment again
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      //Analyse the cart => Find the existing product
      const existingProductIndex = cart.products.findIndex((prod) => {
        prod.id === id;
      });
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      //Add new product/increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct }; //Spread operator
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;

      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart={...JSON.parse(fileContent)};
      const product=updatedCart.products.find(prod=>prod.id===id);
      // if(product==null){
      //   return console.log("product is not in cart");
      // }
      const productQty=product.qty;
      updatedCart.products=updatedCart.products.filter(prod=>prod.id !== id);// Storing all products except that id product
      updatedCart.totalPrice=updatedCart.totalPrice-productPrice*productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      });
    });
  }



static getCart(cb) {
  fs.readFile(p, (err, fileContent) => {
    const cart = JSON.parse(fileContent);
    if (err) {
      cb(null);
    } else {
      cb(cart);
    }
  });
}
};

*/