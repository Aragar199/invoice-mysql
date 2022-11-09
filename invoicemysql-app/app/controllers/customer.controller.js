const Customer = require("../models/customer.models.js")

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        })
    }

    const customer = new Customer({
        name: req.body.name,
        email: req.body.email
    })

    Customer.create(customer, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the customer"
            })
        }
        else res.send(data)
    })
}

exports.findByEmail = (req, res) => {
    Customer.findByEmail(req.query.email, (err, data) => {
        if (err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Customer with email ${req.query.email} not found.`
                })
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with email " + req.query.email
                })
            }
        } else res.send(data)
    })
}