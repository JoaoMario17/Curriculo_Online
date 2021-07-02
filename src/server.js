var bodyParser = require('body-parser');
var aws = require('aws-sdk')
var express = require('express');
var app = express();
var path = require("path");

//Configurações do express 
app.use(express.static(path.join(__dirname,"..","public")));
app.set("views", path.join(__dirname,"..","public"));
app.engine("html",require("ejs").renderFile);
app.set("view engine", "html");

//Configurações do body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//configurações do aws SES
var email = "joaomariofidelis@gmail.com"
aws.config.loadFromPath(__dirname + '/config.json');
var ses = new aws.SES();

//Rotas
app.get('/', function (req,res) {
    return res.render("pages/index.html");
});

app.post('/email', function (req,res) {

    var ses_mail = "From: 'Site Currículo' <" + email + ">\n";
    ses_mail = ses_mail + "To: " + email + "\n";

    ses_mail = ses_mail + "Subject: Texto enviado pelo formulário do currículo online\n";

    ses_mail = ses_mail + "MIME-Version: 1.0\n";
    ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
    ses_mail = ses_mail + "--NextPart\n";
    ses_mail = ses_mail + "Content-Type: text/html; charset=us-ascii\n\n";
    ses_mail = ses_mail + "Enviado por: " + req.body.nome + "<br>";
    ses_mail = ses_mail + "email: " + req.body.email + "<br><br>";
    ses_mail = ses_mail + req.body.texto + ".\n\n";
    ses_mail = ses_mail + "--NextPart\n";
    ses_mail = ses_mail + "Content-Type: text/plain;\n";
    /* ses_mail = ses_mail + "Content-Disposition: attachment; filename=\"attachment.txt\"\n\n";
    ses_mail = ses_mail + "AWS Tutorial Series - Really cool file attachment!" + "\n\n"; */
    ses_mail = ses_mail + "--NextPart--";
    
    var params = {
        RawMessage: { Data: new Buffer.from(ses_mail) },
        Destinations: [ email ],
        Source: "'Site Currículo' <" + email + ">'"
    };
    
    ses.sendRawEmail(params, function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            res.redirect("/pages/index.html");
        }           
    });
});

app.listen(5000, () => console.log("> Server is running on port 5000"));
