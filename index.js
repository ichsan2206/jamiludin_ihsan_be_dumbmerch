const express = require('express')
require("dotenv").config()

// Get routes to the variabel
const router = require('./src/routes')

const app = express()

const port = 5000

app.use(express.json())

// Add endpoint grouping and router
app.use('/api/v1/', router)
// static image view root
app.use("/uploads", express.static("uploads"))

app.listen(port, () => console.log(`Listening on port ${port}!`))
