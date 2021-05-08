var express = require('express');
var https = require('https');
var app = express();
var path = require("path");

app.use(express.static(path.join(__dirname,"..","public")));
app.set("views", path.join(__dirname,"..","public"));
app.engine("html",require("ejs").renderFile);
app.set("view engine", "html");

var httpsServer = https.createServer(app);

app.get('/', function (req,res) {
    return res.render("pages/index.html");
});


httpsServer.listen(443, () => console.log("> Server is running on port 5000"));