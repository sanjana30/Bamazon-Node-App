var inquirer = require("inquirer");
var Table = require('cli-table');
var mysql = require("mysql");
var chalk = require("chalk");
var flag = true;
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    managerAction();
});

function managerAction() {

    if (flag == true) {
        inquirer.prompt([
            {
                type: "list",
                message: "What do you wanna do?",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"],
                name: "managerChoices"
            }
        ]).then(function (response) {
            if (response.managerChoices == "View Products for Sale") {
                showProductsForSale();
            }
            else if (response.managerChoices == "View Low Inventory") {
                showLowInventory();
            }
            else if (response.managerChoices == "Add to Inventory") {
                addToInventory();
            }
            else if (response.managerChoices == "Add New Product") {
                addNewProduct();
            }
            if (response.managerChoices == "Quit") {
                flag = false;
                managerAction();
            }
        });
    }
    else {
        console.log(chalk.red("Bye Bye! See you again soon."));
    }
}

function showProductsForSale() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, res) {
        if (err) throw err;
        var table = new Table({
            head: ['id', 'Product', 'Price', 'Stock Quantity']
            , colWidths: [10, 200, 20]
        });
        console.log(`id ||      Product     ||      Price       ||      Stock Quantity`);
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]);
            // console.log(`${res[i].item_id}  ||      ${res[i].product_name}      ||      ${res[i].price}     ||      ${res[i].stock_quantity}`);
        }
        console.log(table.toString());
        managerAction();
    });
}

function showLowInventory() {
    connection.query("SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5 || stock_quantity=5", function (err, res) {
        if (err) throw err;
        var table = new Table({
            head: ['id', 'Product', 'Stock Quantity']
            , colWidths: [10, 200, 20]
        });
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].stock_quantity]);
            // console.log(`${res[i].item_id}  ||      ${res[i].product_name}      ||      ${res[i].stock_quantity}`);
        }
        console.log(table.toString());
        managerAction();
    });
}

function addToInventory() {
    inquirer.prompt([
        {
            message: "Enter the product id you wish to add to:",
            name: "productId",
        },
        {
            message: "Enter the number of units of the item you wish to add:",
            name: "productUnits"
        }

    ]).then(function (response) {
        var units = parseInt(response.productUnits);
        var id = parseInt(response.productId);
        connection.query("UPDATE products SET stock_quantity=stock_quantity +" + units + " WHERE ?", [
            {
                item_id: id
            }
        ], function (err, res) {
            if (err) throw err;
            console.log(chalk.green("Stock Added!"));
            managerAction();
        });
    });
}

function addNewProduct() {
    inquirer.prompt([
        {
            message: "Enter the product name you wish to add :",
            name: "productName"
        },
        {
            message: "Enter the department the product belongs to:",
            name: "productDepartment"
        },
        {
            message: "Enter the price per product piece:",
            name: "productPrice"
        },
        {
            message: "Enter the number of units of the item you wish to add:",
            name: "productUnits"
        }

    ]).then(function (response) {

        connection.query("INSERT INTO products SET ?", [
            {
                product_name: response.productName,
                department_name: response.productDepartment,
                price: parseFloat(response.productPrice),
                stock_quantity: parseInt(response.productUnits)
            }
        ], function (err, res) {
            if (err) throw err;
            console.log(chalk.green("Item Added!"));
            managerAction();
        });
    });
}