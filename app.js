const path = require('path');
const express = require('express');
const app = express();


var distPath = path.join(__dirname, 'dist');

app.use(express.static(distPath));


app.get('/', (req, res) => {
    res.sendfile('dist/index.html', {root: __dirname});
});


// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
    console.log('Listening on port ' + listener.address().port);
});