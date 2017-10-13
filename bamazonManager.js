var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Sonom@14",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt({
      name: "mainMenu",
      type: "list",
      message: "Please select an option below:",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    })
    .then(function(answer) {
      switch (answer.mainMenu) {
        case "View Products for Sale":
          viewProducts();
          break;
        case "View Low Inventory":
          viewLowInventory();
          break;
        case "Add to Inventory":
          addInventory();
          break;
        case "Add New Product":
          newProduct();
          break;
    };
  });
}

function viewProducts() {
   connection.query(
            "select * from products", function(err, res) {
              for (var i = 0; i < res.length; i++) {
                console.log(res[i].product_name);
              }
              connection.end();
            });
           
}

function viewLowInventory() {
   connection.query(
            "select * from products where stock_qty < 6", function(err, res) {
              for (var i = 0; i < res.length; i++) {
                console.log("item_id: " + res[i].item_id + " | " + "stock_qty: " + res[i].stock_qty);
              }
              if (!res.length) {
                console.log("No items on low inventory");
              }
              connection.end();
            });
           
}

function addInventory() {
  inquirer
    .prompt([
      {
        name: "item_id",
        message: "Please enter the ID of the item whose inventory you wish to increase"
      },
      {
        name: "add",
        message: "How many of this item would you like to add?"
      }
    ]).then(function(answer) {
        calcNewQty(answer);
    })
}

function calcNewQty(answer) {
  connection.query(
            "select * from products where item_id =?", answer.item_id, function(err, res) {
            newQty = parseInt(res[0].stock_qty) + parseInt(answer.add);
            updateInventory(answer.item_id, newQty);
        })
}

function updateInventory(item_id, newQty) {
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_qty: newQty
      },
      {
        item_id: item_id
      }
    ], function() {
      connection.end();
    });
}


function newProduct() {
   inquirer
    .prompt([
      {
        name: "product_name",
        message: "Please enter the name of the new product"
      },
      {
        name: "dept_name",
        message: "Please enter the department of the new product"
      },
      {
        name: "price",
        message: "Please enter the price of the new product"
      },
      {
        name: "qty",
        message: "Please enter the quantity of the new product"
      }
    ]).then(function(answer) {
        createProduct(answer.product_name, answer.dept_name, answer.price, answer.qty);
    }) 
}

function createProduct(name, dept, price, qty) {
  console.log("name: " + name + " dept: " + dept + " price: " + price + " qty: " + qty);
  var values = {product_name: name, dept_name: dept, price: price, stock_qty: qty};
   connection.query(
      "insert into products set ?", values, function() {
      connection.end();
    });
}

