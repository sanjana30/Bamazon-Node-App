DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
	item_id INTEGER AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100),
	price DECIMAL(10, 2) DEFAULT 0,
	stock_quantity INTEGER(10) DEFAULT 0,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price)
VALUES ("iPhone-7", "Mobile Phone & Accessories", 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 	("Fountain Pen", "Stationery", 2, 50),
		("Oreo Biscuits", "Food", 3, 75 ),
		("Pringles", "Food", 1.99, 35),
		("Notebook", "Stationery", 5, 50),
		("Casio G-Shock", "Watches", 200, 15),
		("Scarf", "Clothes", 9.99, 32),
		("Hair Dryer", "Hair Accessories", 120, 25),
		("Lip Balm", "Beauty & Cosmetics", 2.89, 100),
		("Chobani Yogurt", "Food", 1.29, 65);

UPDATE products SET stock_quantity = stock_quantity - 1 WHERE item_id = 6;
SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity <= 5;
UPDATE products SET stock_quantity=stock_quantity+1 WHERE item_id=2;

ALTER TABLE products
  ADD product_sales DECIMAL(10,2) DEFAULT 0;

SELECT * FROM products;

CREATE TABLE departments(
	department_id INTEGER NOT NULL AUTO_INCREMENT,
	department_name VARCHAR(100),
	over_head_costs INTEGER(10),
	PRIMARY KEY(department_id)
);

INSERT INTO departments(department_name, over_head_costs)
VALUES ("Mobile Phone & Accessories", 500),
		("Stationery", 15),
		("Food", 50),
		("Watches", 100),
		("Clothes", 5),
		("Hair Accessories", 80),
		("Beauty & Cosmetics", 4),
		("Home Decore", 25),
		("Laptop", 100);

SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales, concat(products.product_sales - departments.over_head_costs) FROM departments INNER JOIN products ON departments.department_name = products.department_name;
