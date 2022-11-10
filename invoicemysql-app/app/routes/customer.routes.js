const customers = require("../controllers/customer.controller.js")

var customerRouter = require("express").Router()

customerRouter.post("/", customers.create)

customerRouter.get("/:email", customers.findByEmail)
customerRouter.get("/:id", customers.findById)

customerRouter.put("/:id", customers.update)

customerRouter.delete("/:id", customers.delete)

module.exports = customerRouter