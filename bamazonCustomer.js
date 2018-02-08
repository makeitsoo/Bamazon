var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "BAMAZON"
});

connection.connect(function(err) {
	if (err) {
		throw err;
		console.error(err)
	}
	console.log("---------------------");
	console.log("CURRENT TEA SELECTION");
	console.log("---------------------");
});

// query returns all songs by particular artist
connection.query("SELECT item_id, product_name, price, stock_quantity FROM products; ",
	function(err, res) {
		if (err) {
			throw err;
			console.error(err);
		}
		for (var i = 0; i < res.length; i++) {
			// console.log(results[i]);
			console.log("Item ID: " + res[i].item_id + " || Tea: " + res[i].product_name + " || Price: $" + res[i].price);
			// console.log(res);
			// terminate();
		}
		console.log("---------------------");
		promptUser();

	function promptUser(){
	    inquirer
	      	.prompt([
	        	{
	          		name: "choice",
	          		type: "rawlist",
	          		choices: function() {
	            		var choiceArray = [];
	            		for (var i = 0; i < res.length; i++) {
	              			choiceArray.push(res[i].product_name);
	            		}
	            		return choiceArray;
	          		},
	          		message: "Which item would you like to purchase?"
	        	},
	        	{
	          		name: "quantity",
	          		type: "input",
	          		message: "How many would you like to buy?"
	        	}
	    	])
	    	// return answer from inquirer user input
	    	.then(function(answer) {
	    		// console.log("answer: ", answer);
	        	// get the information of the chosen item
	        	var chosenItem;
	        	for (var i = 0; i < res.length; i++) {
	        		// updates chosenItem variable with the users selection if there is a match with optional items/products 
	          		if (res[i].product_name === answer.choice) {
	            		chosenItem = res[i];
	          		}
	        	}
	        	// checks if sufficient inventory for users purhase
	        	if (answer.quantity < chosenItem.stock_quantity) {
	        		// var to store new updated stock_quantity for item
	        		updatedQuantity = chosenItem.stock_quantity - answer.quantity;
	        		console.log("item inventory: ", chosenItem.stock_quantity)
	        		console.log("quantity purchased: ", answer.quantity)
	        		console.log("updated quantity: ", updatedQuantity)
	        		// update stock_quantity for item in MySQL database 
					connection.query("UPDATE products SET ? WHERE ?",
						[{stock_quantity: updatedQuantity}, {item_id: chosenItem.item_id}],
						function(error) {
					  		if (error) throw err;
					  			console.log(answer.quantity + " " + answer.choice + " tea SUCCESSFULLY PURCHASED!");
						}
					);
   					// show the customer the total cost of their purchase.
   					console.log("TOTAL AMOUNT CHARGED: $" + answer.quantity * chosenItem.price);
   					terminate();
	        	}
	        	// else display message to user and reprompt 
	        	else {
	        		console.log("Sorry but we currently have insufficient inventory to fulfill your request for " + answer.quantity + " " + answer.choice + "packages. Please reduce qantity to " + chosenItem.stock_quantity + " or less. Thank you.");
	        		promptUser();
	        	}
	    	});
		}
});


function terminate() {
	connection.end();
};
