var express = require('express');
var router = express.Router();
var fs = require("fs"); 
const path = process.cwd()+'/restapi/'

router.get('/list',
  async function (req, res) {
    console.log(__dirname)
    fs.readFile(path + "categories.json", 'utf8', function (err, data) {  
      data = JSON.parse( data );
      console.log( data );  
      res.json( data );  
    }); 
  }
);

router.get('/:id',
  async function(req, res) {
    fs.readFile(path + "categories.json", 'utf8', function (err, data) {  
      categories = JSON.parse( data );  
      console.log(req.params.id);  
      var category = categories["category" + req.params.id]   
      console.log( category );  
      res.json( category);  
    }); 
  }
);

router.post('/add',
  async function(req, res) {
    fs.readFile(path + "categories.json", 'utf8', function (err, data) {  
      var obj = JSON.parse('[' + data + ']' );  
      obj.push(req.body);  
      console.log(obj);  
      res.json( obj );  
    });  
  }
);

router.delete('/delete/:id',
  async function(req, res) {
   fs.readFile( __dirname + "/" + "categories.json", 'utf8', function (err, data) {  
    data = JSON.parse( data );  
    delete data["category" + req.params.id];  
    console.log( data );  
    res.json(data);  
});  
  }
);


module.exports = router;