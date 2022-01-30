var express = require('express');
var router = express.Router();
var fs = require("fs"); 
const path = process.cwd()+'/restapi/'

router.get('/list',
  async function (req, res) {
    fs.readFile(path + "users.json", 'utf8', function (err, data) {  
      data = JSON.parse( data );
      console.log( data );  
      res.json( data );  
    }); 
  }
);

router.get('/:id',
  async function(req, res) {
    fs.readFile(path + "users.json", 'utf8', function (err, data) {  
      users = JSON.parse( data );  
      console.log(req.params.id);  
      var user = users["user" + req.params.id]   
      console.log( user );  
      res.json( user);  
    }); 
  }
);

router.post('/add',
  async function(req, res) {
    const body = req.body
    res.json(body)
  }
);

router.delete('/delete/:id',
  async function(req, res) {
   fs.readFile(path + "users.json", 'utf8', function (err, data) {  
    data = JSON.parse( data );  
    delete data["user" + req.params.id];  
    console.log( data );  
    res.json( data);  
  });  
  }
);


module.exports = router;