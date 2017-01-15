var express = require('express');
var formidable = require('formidable');
var shortid = require('short-id');

shortid.configure({
    length: 4,          // The length of the id strings to generate
    algorithm: 'sha1',  // The hashing algoritm to use in generating keys
    salt: Math.random   // A salt value or function
});


var app = express();
var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res){

    //console.log(req.body);
    var form = new formidable.IncomingForm();
    form.parse(req);
    var nombredoc='';
    var maxSize = 3146000; //3MB
    form.on('fileBegin', function (name, file){
      //console.log(form.bytesExpected);
      if(form.bytesExpected > maxSize)
        {
          console.log("pesado");


        }else{
          nombredoc=shortid.generate()+"-"+file.name;
          file.path = __dirname + '/uploads/' + nombredoc;
        }


    });

    var fields = [];
      form.on('field', function (field, value) {
          fields[field] = value;
      });


      form.on('end', function () {
        //console.log(fields['name']);
        //console.log(nombredoc);
         });

    res.sendFile(__dirname + '/index.html');
});

app.get('/modal',function(req,res){
  res.sendFile(__dirname + '/modal.html');
})

// Add headers
/*
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'null');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

*/
var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'null'}));

app.post('/borrar',function(req,res){
  /*console.log("LLEGO");
  console.log(req.body.datos);
  var obj = {};
  console.log( JSON.stringify(req.body));

  */
// HACES CONSULTA  A LA BASE DE datos
  var obj = {};
  obj.mensaje="exito"
res.send(JSON.stringify(obj));

})



app.listen(3000);
