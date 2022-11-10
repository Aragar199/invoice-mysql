const Invoice = require("../models/invoice.models.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        })
    }

    const invoice = new Invoice({
        invoiceNumber: req.body.invoiceNumber,
        customerId: req.body.customerId
    })

    Invoice.create(invoice, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the invoice"
            })
        }
        else res.send(data)
    })
}

exports.findByNumber = (req, res) => {
    Invoice.findByNumber(req.params.id, (err, data) => {
        if (err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Invoice with id ${req.params.id} not found.`
                })
            } else {
                res.status(500).send({
                    message: "Error retrieving Invoice with id " + req.params.email
                })
            }
        }
    })
}

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        })
    }

    console.log(req.body)

    Invoice.updateById(
        req.params.id,
        new Invoice(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Invoice not found with id ${req.params.id}.`
                    })
                } else {
                    res.status(500).send({
                        message: "Error updating Invoice with id " + req.params.id
                    })
                }
            } else res.send(data)
        }
    )
}

exports.delete = (req, res) => {
    Invoice.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Invoice not found with id ${req.params.id}.`
                })
            } else {
                res.status(500).send({
                    message: "Could not delete Invoice with id " + req.params.id
                })
            }
        } else res.send({ message: "Successfully deleted Invoice with id " + req.params.id })
    })
}