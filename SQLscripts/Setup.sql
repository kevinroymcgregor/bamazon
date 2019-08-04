CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products 
	(
		item_id INT auto_increment NOT NULL,
        product_name VARCHAR(50) NOT NULL UNIQUE,
        department_name VARCHAR(50) NOT NULL,
        price DOUBLE NOT NULL,
        stock_quantity INT NOT NULL,
        PRIMARY KEY (item_id)
	);
INSERT INTO products 
	(
		product_name, department_name, price, stock_quantity
	)
VALUES ("Star Wars Blu-Ray", "Movies", 20.00, 15),
	("Empire Strikes Back Blu-Ray", "Movies", 19.95, 17),
    ("Return of the Jedi Blu-Ray", "Movies", 21.98, 12),
    ("Luke Skywalker Action Figure", "Toys", 12.00, 10),
    ("Princess Leia Action Figure", "Toys", 15.00, 11),
    ("Thrawn", "Books", 17.00, 15),
    ("Thrawn: Alliances", "Books", 17.00, 15),
    ("Thrawn: Treason", "Books", 12.00, 10);