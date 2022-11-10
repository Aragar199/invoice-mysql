module.exports = app => {
    const customers = require("../controllers/customer.controller.js")

    var router = require("express").Router()

    router.post("/", customers.create)

    router.get("/:email", customers.findByEmail)
    router.get("/:id", customers.findById)
    
    router.put("/:id", customers.update)

    router.delete("/:id", customers.delete)

    app.use('/api/customers', router)
}