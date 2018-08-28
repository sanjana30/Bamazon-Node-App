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

SELECT * FROM products;

