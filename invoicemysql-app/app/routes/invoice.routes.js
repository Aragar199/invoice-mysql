const invoices = require("../controllers/invoice.controller.js")

var router = require("express").Router()

router.post("/", invoices.create)

router.get("/:id", invoices.findByNumber)

router.put("/:id", invoices.update)

router.delete("/:id", invoices.delete)

module.exports = invoiceRouter