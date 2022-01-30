var express = require('express');
var router = express.Router();
var fs = require("fs"); 
const path = process.cwd()+'/restapi/'
const axios = require('axios')

router.get('/list',
  async function (req, res) {
    fs.readFile(path + "posts.json", 'utf8', function (err, data) {  
      res.json( JSON.parse(data) );  
    }); 
  }
);

router.post('/add',
  async function(req, res) {
    const body = req.body
    axios.post('https://prod-34.northeurope.logic.azure.com:443/workflows/37d77b7d89e04cd6a08c43e9b42b6f6d/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=CD9IjEHx0uETaskO-V2XD9tsQ4AfSIBe0LFtr55Y5Ks', body)
    res.json(body)
  }
);


module.exports = router;