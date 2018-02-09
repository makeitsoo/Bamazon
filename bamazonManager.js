function run() {
	var mysql = require("mysql");
	var inquirer = require("inquirer");

	function promptUser(){
	    inquirer.prompt([
	    	{
	      		name: "mainMenu",
	      		type: "rawlist",
	      		choices: ["View Items Listed for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "I'm Done!"],
	      		message: "What would you like to do?"
	    	}
		])
		// return answer from inquirer user input
		.then(function(answer) {
			// console.log("answer: ", answer);
			if (answer.mainMenu === "View Items Listed for Sale") {
				// get all items for sale
				console.log("\n              CURRENT ITEMS FOR SALE")
				console.log("---------------------------------------------------------")
	    		queryAllItems();
			} else if (answer.mainMenu === "View Low Inventory") {
				console.log("\n          LOW INVENTORY")
				console.log("----------------------------------------")
				queryLowInventory();
			} else if (answer.mainMenu === "Add to Inventory") {
				console.log("\n   ADD TO INVENTORY")
				console.log("----------------------")
	    		// queryAddInventory();
			} else if (answer.mainMenu === "Add New Product") {
				console.log("\n   ADD NEW PRODUCT")
				console.log("----------------------")
	    		// queryAddProduct();
			} else if (answer.mainMenu === "I'm Done!") {
				console.log("\n    GOOD BYE!")
	    		terminate();
			} else {
				console.log("----------------------")
				console.log("\nInvalid selection. Please choose 1-4.\n")
			}
		});
	}
	promptUser()

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
		// console.log("---------------------");
		// console.log("SUCCESSFUL CONNECTION...");
		// console.log("---------------------");
	});

	// query returns all songs by particular artist

	function queryAllItems() {
		connection.query("SELECT item_id, product_name, price, stock_quantity FROM products; ",
			function(err, res) {
				if (err) {
					throw err;
					console.error(err);
				}
				for (var i = 0; i < res.length; i++) {
					// console.log(results[i]);
					console.log("Item ID: " + res[i].item_id + " || Tea: " + res[i].product_name + " || Price: $" + res[i].price + " || # In Stock: " + res[i].stock_quantity);
					// console.log(res);
				}
				console.log("---------------------------------------------------------");
				// promptUser();
			});
		terminate();
	};


	function queryLowInventory() {
		connection.query("SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5;",
			function(err, res) {
				if (err) {
					throw err
					console.error(err);
				}

				for (var i = 0; i < res.length; i++) {
					// console.log("res[i]: ", res[i]);
					// console.log(res.product_name);			
					console.log("Tea: " + res[i].product_name + " || # In Stock: " + res[i].stock_quantity);
				}
				console.log("----------------------------------------")
				console.log("\nPlease order and restock items listed above.")
			});
		terminate();
	}



	function terminate() {
		connection.end();
	};
};

run();
