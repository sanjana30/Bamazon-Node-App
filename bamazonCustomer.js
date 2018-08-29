var inquirer = require("inquirer");
var Table = require('cli-table');
var mysql = require("mysql");
var chalk = require("chalk");
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err;
    displayItemsOnSale();
});

function displayItemsOnSale() {
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        var table = new Table({
            head: ['id', 'Product', 'Price']
            , colWidths: [10, 200, 20]
        });
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].price]);
            // console.log(`${res[i].item_id}  ||      ${res[i].product_name}      ||      ${res[i].price}`);
        }
        console.log(table.toString());
        userShoppingchoice();
    });
}



function userShoppingchoice() {

    inquirer.prompt([
        {
            message: "Enter the id of the product you would like to buy (refer the list above):",
            name: "id"
        },
        {
            message: "How many units of the product would you like to buy?",
            name: "units"
        }
    ]).then(function (response) {
        checkAvailability(response.id, response.units);
    });
}

function checkAvailability(id, units) {
    connection.query("SELECT stock_quantity FROM products WHERE ?", [{
        item_id: id
    }], function (err, res) {
        if (err) throw err;
        if (res[0].stock_quantity < units) {
            console.log("Insufficient Quantity");
        }
        else {
            connection.query("UPDATE products SET stock_quantity=stock_quantity -" + units + " WHERE ?", [
                {
                    item_id: id
                }
            ], function (err, res) {
                if (err) throw err;
                
                showCostOfPurchase(id, units);
            });
        }
    });
}

function showCostOfPurchase(id, units) {
    var userCost;
    connection.query("SELECT price FROM products WHERE ?", [{ item_id: id }], function (err, res) {
        if (err) throw err;
        userCost = res[0].price * units;
        console.log(chalk.red("Cost incurred: $")+ userCost);
    });
}