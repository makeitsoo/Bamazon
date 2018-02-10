INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("english breakfast", "black tea", 22.50, 0);


UPDATE products
SET stock_quantity = updatedQuantity
WHERE item_id = chosenItem.item_id;


INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('" + answer.item + "', '" + answer.dept + "', " + answer.cost + ", " + answer.quantity + ");"
