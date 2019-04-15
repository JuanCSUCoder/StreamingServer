var https = require('https');
var express = require('express');
var subdomain = require('express-subdomain');
var app = express();
var router = express.Router();
var fs = require('fs');

app.use(router);

var server = https.createServer({
    key: fs.readFileSync('/mnt/DATOS Linux/Dropbox/Documentos/2019/Projects 2019/Certificado HTTPS/clave_priv.key'),
    cert: fs.readFileSync('/mnt/DATOS Linux/Dropbox/Documentos/2019/Projects 2019/Certificado HTTPS/certificado.crt'),
},app).listen(443,()=>{
    console.info("Servidor Seguro Escuchando ...");
});

router.get('/',(req,res)=>{
    res.send("Conexion Exitosa");
});