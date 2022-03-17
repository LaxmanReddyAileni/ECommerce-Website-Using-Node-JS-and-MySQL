const adminRoutes = require("./routes/admin"); //Used by admin to create and edit/delete the products
const shoprouter = require("./routes/shop"); //Used by user

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error"); //Controller import
const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const OrderItem = require("./models/order-item");
const Order = require("./models/order");

const app = express(); //running express as a function

app.set("view engine", "ejs"); //ejs is also a template engine instead of handlebars and jade/pug
app.set("Views", "Views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes); //Filtering paths
app.use(shoprouter); // This app uses routes where controllers are initialized In Controleers the get post methods and logics are defined
app.use(errorController.get404); //Error controller logic

//     ***ASSOCIATIONS***

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" }); //Sequelize documentation in Detail about the implications
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through : OrderItem} ); //Order can have many products from OrderItem


sequelize
  //.sync({force:true}) //sync the models into appropriate tables created in modals product.js folder  /sync the db the users will be gone by this force:true
  .sync()
  .then((result) => {
    return User.findByPk(1);
    // User.findAll({ where: { name: "Max" } }).then((user) => {
    //   return user;
    // });
    // console.log(result);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Max", email: "a@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart) => app.listen(3000))
  .catch((err) => console.log(err));
