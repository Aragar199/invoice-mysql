const sql = require("./db.js")

const Customer = function(customer) {
    this.name = customer.name
    this.email = customer.email
}

Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        }

        console.log("customer created: ", { id: res.insertId, ...newCustomer })
        result(null, { id: res.insertId, ...newCustomer })
    })
}

Customer.findByEmail = (email, result) => {
    sql.query(`SELECT * FROM customers WHERE email="${email}"`, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        }

        if (res.length) {
            console.log("found email: ", res[0])
            result(null, res[0])
            return
        }

        result({ kind: "not_found"}, null)
    })
}

module.exports = Customer