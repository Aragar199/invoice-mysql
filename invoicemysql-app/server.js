require("dotenv").config()

const express = require("express")
const cors = require("cors")

const app = express()

const corsOptions = {
    origin: ["http://localhost:8081", "http://localhost:3000"]
}

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true}))

app.get("/", (req, res) => {
    res.json({ message: "invoicer db OK"})
})

require("./app/routes/customer.routes.js")(app)
require("./app/routes/invoice.routes.js")(app)

const PORT = process.env.PORT || 6868
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})