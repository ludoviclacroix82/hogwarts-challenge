const express = require("express")
const app = express()
const dotenv = require('dotenv')

dotenv.config()

const connectDB = require('./config/db')

const PORT = process.env.PORT
connectDB();

require("./routes/userRoutes")(app)



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
