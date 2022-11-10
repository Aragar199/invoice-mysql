const sql = require("./db.js")

const Invoice = function(invoice) {
    this.invoiceNumber
    this.customerID
}

Invoice.create = (newInvoice, result) => {
    sql.query("INSERT INTO invoices SET ?", newInvoice, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        }

        console.log("invoice created: ", { id: res.insertId, ...newInvoice })
        result(null, { id: res.insertId, ...newInvoice })
    })
}

Invoice.findByNumber = (invoiceNumber, result) => {
    sql.query(`SELECT * FROM invoices WHERE invoiceNumber=${invoiceNumber}`, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        }

        if (result.length) {
            console.log("found invoice invoiceNumber: ", res[0])
            result(null, res[0])
            return
        }

        result({kind: "not_found"}, null)
    })
}

Invoice.updateById = (id, invoice, result) => {
    sql.query(
        "UPDATE invoices SET invoiceNumber = ? WHERE id = ?",
        [invoice.invoiceNumber, id],
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

            console.log("updated invoice: ", { id: id, ...invoice })
            result(null, { id: id, ...invoice })
        }
    )
}

Invoice.remove = (id, result) => {
    sql.query("DELETE FROM invoices WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(null, err)
            return
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found"}, null)
            return
        }

        console.log("Deleted invoice with id: ", id)
        result(null, res)
    })
}

module.exports = Invoice
