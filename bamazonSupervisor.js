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
    inquirer.prompt([
        {
            type: "list",
            message: "What do you wanna do?",
            name: "supervisorChoices",
            choices: ["View Product Sales by Department", "Create New Department"]
        }
    ]).then(function(response){
        if(response.supervisorChoices == "View Product Sales by Department"){
            viewSalesByDepartment();
        }
    });
});

function viewSalesByDepartment(){
    connection.query("SELECT departments.department_id, departments.department_name,    departments.over_head_costs,products.product_sales,CONCAT(products.product_sales - departments.over_head_costs) AS total_profits FROM departments INNER JOIN products ON departments.department_name = products.department_name;", function(err, res){
        if(err) throw err;
        var table = new Table({
            head: ['Department ID', 'Department Name', 'Over-head Costs', 'Product Sales', 'Total Profits']
            , colWidths: [10, 50, 10, 10, 10]
        });
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, res[i].total_profits]);            
        }
        console.log(table.toString());
    })
}