module.exports = app => {
    const customers = require("../controllers/customer.controller.js")

    var router = require("express").Router()

    router.post("/", customers.create)

    router.get("/", customers.findByEmail)

    app.use('/api/customers', router)
}