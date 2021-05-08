var express = require('express');
var http = require('http');
var app = express();
var path = require("path");

app.use(express.static(path.join(__dirname,"..","public")));
app.set("views", path.join(__dirname,"..","public"));
app.engine("html",require("ejs").renderFile);
app.set("view engine", "html");

var httpServer = http.createServer(app);

app.get('/', function (req,res) {
    return res.render("pages/index.html");
});


httpServer.listen(80, () => console.log("> Server is running on port 80"));