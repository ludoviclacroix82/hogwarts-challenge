const { log } = require("console")

module.exports = (app) => {

    app.get("/", (req, res) => {

        res.send('bonjour')
    })

}