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
      name: "askID",
      message: "Please enter the ID of the item you wish to buy"
    })
    .then(function(answer) {
     console.log("item_id = " + answer.askID);
     checkItem(answer.askID);
    });
}

function checkItem(item_id) {
	 connection.query(
            "select * from products", function(err, res) {
			      if (res[0].item_id == item_id) {
			      	askQty(item_id);
			      } else {
			      	console.log("We're sorry, no item found");
			      	connection.end();
			      }
            })
           
}

function askQty(item_id) {
	inquirer
    .prompt({
      name: "askQty",
      message: "Please enter the quantity of the item to purchase"
    })
    .then(function(answer) {
     connection.query(
            "select * from products where item_id=?", item_id, function(err, res) {
			      if (answer.askQty <= res[0].stock_qty) {
			      	console.log("Purchase confirmed. You will be billed a total of $" + answer.askQty * res[0].price);
			      	var newQty = res[0].stock_qty - answer.askQty;
			      	adjustQty(item_id, newQty);
			      	connection.end();
			      } else {
			      	console.log("We're sorry, we only have " + res[0].stock_qty + " left. Please try again.");
			      	connection.end();
			      }
            })
    });
}

function adjustQty(item_id, newQty) {
	connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_qty: newQty
              },
              {
                item_id: item_id
              }
            ]);
}