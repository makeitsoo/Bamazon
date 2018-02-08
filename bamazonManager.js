function run() {
	var mysql = require("mysql");
	var inquirer = require("inquirer");

	function promptUser(){
	    inquirer.prompt([
	    	{
	      		name: "mainMenu",
	      		type: "rawlist",
	      		choices: ["View Items Listed for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
	      		message: "What would you like to do?"
	    	}
		])
		// return answer from inquirer user input
		.then(function(answer) {
			// console.log("answer: ", answer);
			if (answer.mainMenu === "View Items Listed for Sale") {
				// get all items for sale
				console.log("CURRENT ITEMS FOR SALE")
				console.log("----------------------")
	    		queryAllItems();
			} else if (answer.mainMenu === "View Low Inventory") {
				console.log("    LOW INVENTORY")
				console.log("----------------------")
	    		// queryLowInventory();
			} else if (answer.mainMenu === "Add to Inventory") {
				console.log("   ADD TO INVENTORY")
				console.log("----------------------")
	    		// queryAddInventory();
			} else if (answer.mainMenu === "Add New Product") {
				console.log("   ADD NEW PRODUCT")
				console.log("----------------------")
	    		// queryAddProduct();
			} else {
				console.log("Invalid selection. Please choose 1-4.")
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
					console.log("Item ID: " + res[i].item_id + " || Tea: " + res[i].product_name + " || Price: $" + res[i].price);
					// console.log(res);
				}
				console.log("---------------------");
				// promptUser();
		});
		terminate();
	};

	function terminate() {
		connection.end();
	};
};

run();
