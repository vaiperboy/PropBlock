var nodemailer = require("nodemailer")

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "propblockuowd@gmail.com",
        pass: "ijtk prfv haox awlt"
    }
})

module.exports = transporter