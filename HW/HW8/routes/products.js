var express = require('express');
var router = express.Router();
var fs = require("fs"); 
const path = process.cwd()+'/restapi/'

router.get('/list',
  async function (req, res) {
    console.log(__dirname)
    fs.readFile(path + "products.json", 'utf8', function (err, data) { 
      data = JSON.parse( data ); 
      console.log( data );  
      res.json( data );  
    }); 
  }
);

router.get('/:id',
  async function(req, res) {
    fs.readFile(path + "products.json", 'utf8', function (err, data) {  
      products = JSON.parse( data );  
      console.log(req.params.id);  
      var product = products["product" + req.params.id]   
      console.log( product );  
      res.json( product);  
    }); 
  }
);

router.post('/add',
  async function(req, res) {
    fs.readFile(path + "products.json", 'utf8', function (err, data) {  
      var obj = JSON.parse('[' + data + ']' );  
      obj.push(req.body);  
      console.log(obj);  
      res.json(obj );  
    });  
  }
);

router.delete('/delete/:id',
  async function(req, res) {
   fs.readFile(path + "products.json", 'utf8', function (err, data) {  
    data = JSON.parse( data );  
    delete data["product" + req.params.id];  
    console.log( data );  
    res.json(data);  
});  
  }
);


module.exports = router;