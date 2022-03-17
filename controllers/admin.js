//All the logic of admin is here  to add any product or edit any product

const Product = require("../models/product"); //importing the product model

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageURL; // This should be imageURL only
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  }) //Sequalise documentaion has this function of createProduct. which itself creates userid in mySQL DB SO this is the advantage of Associations
  // Product.create(
  //   //Sequelise
  // )
    .then((result) => {
      // console.log(result);
      console.log("Create Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
  // Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));

  // Product.fetchAll((products) => {
  //   res.render("admin/products", {
  //     prods: products,
  //     pageTitle: "Admin Products",
  //     path: "/admin/products",
  //   });
  // });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    //If query parameter doesnot work then this is executed
    return res.redirect("/");
  }

  const prodId = req.params.productId; //Get the id from URL

  // Product.findById(prodId)  we can use findByPk instead of findById
  /*Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/"); //If no product then go and exe this
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
*/
req.user.getProducts({where : { id : prodId }})
  // Product.findAll({ where: { id: prodId } })
    .then((products) => {
      const product= products[0];
      if (!product) {
        return res.redirect("/"); //If no product then go and exe this
      }
      console.log("Products is : " + product);
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
  // Product.findById(prodId,);
};

//   *****   Editing the Product   *****

exports.postEditProduct = (req, res, next) => {
  // It works if Update button is pressed
  const prodId = req.body.productId; // In edit-product.ejs product id is saved by input as hidden as productId
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageURL;
  const updatedDescription = req.body.description;
  Product.findAll({ where: { id: prodId } })
    .then((product) => {
      //Promises
      product[0].title = updatedTitle;
      product[0].price = updatedPrice;
      product[0].description = updatedDescription;
      product[0].imageUrl = updatedImageUrl;
      return product[0].save();
    })
    .then((result) => {
      console.log("Updated Product");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
  /* const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedPrice,
    updatedDescription
  ); //Storing the data of price imageURL title etc in product
  updatedProduct.save();
  */
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // Product.deleteById(prodId);  //Destroy can also be used
  Product.findAll({ where: { id: prodId } })
    .then((product) => {
      //Promises

      return product[0].destroy();
    })
    .then((result) => {
      console.log("Deleted Product");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
