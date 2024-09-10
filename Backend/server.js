const express = require("express")
const cors = require("cors")
const app = express()
const dotenv = require('dotenv')
const userRoutes = require("./routes/userRoutes")

dotenv.config()

const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000
connectDB()

app.use(cors())

app.use(express.json())
app.use('/api/', userRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


