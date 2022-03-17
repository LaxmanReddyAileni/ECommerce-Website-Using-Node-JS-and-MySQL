const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "Arjunreddy@403", {
  dialect: "mysql",
  host: "localhost",
});

module.exports=sequelize;
