const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    displayProducts();
});

const displayProducts = () => 
    {
        connection.query
        (
            `SELECT item_id, product_name, department_name, 
            price, stock_quantity FROM products`, 
            function(err, results)
                {
                    if(err) throw err;
                    results.forEach( elements => {
                        console.log(
                            `Item ID: ${elements.item_id} \n` +
                            `Product Name: ${elements.product_name} \n` +
                            `Product Price: $${elements.price} \n` +
                            `----------------------------------------`
                        )
                        });
                    userInput();
                }
        );
    };
const userInput = () => 
    {
        inquirer.prompt(
            [
                {
                    name: `item`,
                    type: `number`,
                    message: `Please enter the item number you want to purchase:`
                },
                {
                    name: `quantity`,
                    type: `number`,
                    message: `Please enter the quantity to purchase:`
                }
            ]
        ).then(
            function(answer)
                {
                    connection.query(
                        "SELECT p.item_id, p.product_name, p.price, p.stock_quantity FROM products p WHERE ?",
                            {
                                item_id: answer.item
                            },
                        function(err, results)
                            {
                                if(err) throw err;
                                // console.log(results[0]);
                                if(results[0].stock_quantity >= answer.quantity)
                                    {
                                        connection.query(
                                            `UPDATE products SET ? WHERE ?`,
                                                [
                                                    {
                                                        stock_quantity: results[0].stock_quantity - answer.quantity
                                                    },
                                                    {
                                                        item_id: answer.item
                                                    }
                                                ]
                                        )
                                        console.log(`Item ordered: ${results[0].product_name}`);
                                        console.log(`Quantity ordered: ${answer.quantity}`);
                                        console.log(`Total price: $${results[0].price * answer.quantity}`)
                                    }else{
                                        console.log(`Sorry dude, we don't have enough. We currently have ${results[0].stock_quantity}.`)
                                    }
                                connection.end();
                            }
                    );
                }
        );
    };