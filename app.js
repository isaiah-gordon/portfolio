const path = require('path');
const express = require('express');
const app = express();

const sendMail = require("./mail.js");

var distPath = path.join(__dirname, 'dist');

app.use(express.static(distPath));


//Data parsing
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())


app.post('/email', (req, res) => {

    const { email, subject, message } = req.body

    sendMail(email, subject, message, function (error, data) {
        if (error) {
            res.status(500).json({ status: false })
        } else {
            res.json({ status: true })
        }
    })
})



app.get('/', (req, res) => {
    res.sendfile('dist/index.html', { root: __dirname });
});


// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
    console.log('Listening on port ' + listener.address().port);
});
