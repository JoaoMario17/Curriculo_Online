var express = require('express');
var app = express();

app.get('/', function (req,res) {
    res.send('hello world');
});


app.listen(5000, () => console.log("> Server is running on port 5000"));