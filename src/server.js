var express = require('express');
var app = express();
var path = require("path");

app.use(express.static(path.join(__dirname,"..","pages")));
app.set("views", path.join(__dirname,"..","pages"));
app.engine("html",require("ejs").renderFile);
app.set("view engine", "html");

app.get('/', function (req,res) {
    return res.render("index.html");
});


app.listen(5000, () => console.log("> Server is running on port 5000"));