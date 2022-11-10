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

Customer.findById = (id, result) => {
    sql.query(`SELECT * FROM customers WHERE id=${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        }

        if (res.length) {
            console.log("found customer id: ", res[0])
            result(null, res[0])
            return
        }

        result({kind: "not_found"}, null)
    })
}

Customer.updateById = (id, customer, result) => {
    sql.query(
        "UPDATE customers SET name = ?, email = ? WHERE id = ?",
        [customer.name, customer.email, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err)
                result(null, err)
                return
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found"}, null)
                return
            }

            console.log("updated customer: ", { id: id, ...customer })
            result(null, { id: id, ...customer })
        }
    )
}

Customer.remove = (id, result) => {
    sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(null, err)
            return
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found"}, null)
            return
        }

        console.log("Deleted customer with id: ", id)
        result(null, res)
    })
}

module.exports = Customer
