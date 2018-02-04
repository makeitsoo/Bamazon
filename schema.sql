CREATE DATABASE BAMAZON;

CREATE TABLE products (
	item_id INT AUTO_INCREMENT NOT NULL,
	product_name VARCHAR (75),
	department_name VARCHAR (75),
	price DECIMAL (12,2),
	stock_quantity INT (12),
	PRIMARY KEY (item_id)
);

