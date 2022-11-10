const invoices = require("../controllers/invoice.controller.js")

var invoiceRouter = require("express").Router()

invoiceRouter.post("/", invoices.create)

invoiceRouter.get("/:id", invoices.findByNumber)

invoiceRouter.put("/:id", invoices.update)

invoiceRouter.delete("/:id", invoices.delete)

module.exports = invoiceRouter