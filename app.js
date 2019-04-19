var https = require('https');
var express = require('express');
//var subdomain = require('express-subdomain');
var app = express();
var router = express.Router();
var fs = require('fs');
var bp = require('body-parser');

app.use(router);
router.use(bp.text());

var server = https.createServer({
    key: fs.readFileSync('/mnt/DATOS Linux/Dropbox/Documentos/2019/Projects 2019/Certificado HTTPS/clave_priv.key'),
    cert: fs.readFileSync('/mnt/DATOS Linux/Dropbox/Documentos/2019/Projects 2019/Certificado HTTPS/certificado.crt'),
},app).listen(443,()=>{
    console.info("Servidor Seguro Escuchando ...");
});

app.get('/emit',(req,res)=>{
    res.sendfile('emit.html');
    console.log('Conexion a Pagina de Emision');
});

app.get('/capture',(req,res)=>{
    res.sendfile('recieve.html');
    console.log('Conexión a Pagina de Recepción');
})

var streams = [];
var nstreams = 0;

router.get('/gid',(req,res)=>{
    nstreams++;
    console.log("Nueva Conexión en: "+nstreams);
    res.json({
        id: nstreams,
    });
    res.end();
});

router.post('/upframe/:a',(req,res)=>{
    var id = req.params.a;
    if(id!=0){
        streams[id] = req.body;
        res.send('OK');
        res.end();
    }else{
        res.status(100).send('ERROR');
    }
});

router.get('/gfram/:a',(req,res)=>{
    var id = req.params.a;
    if(id!=0){
        res.json({
            fr: streams[id],
        });
        res.end();
    }else{
        res.status(100).send('ERROR');
    }
});

router.get('/set/crfr',(req,res)=>{
    crfr = req.query.val;
});

router.get('/set/csfr',(req,res)=>{
    csfr = req.query.val;
});