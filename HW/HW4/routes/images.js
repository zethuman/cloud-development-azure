const router = require('express-promise-router')();
const graph = require('../graph.js');
const { body, validationResult } = require('express-validator');
const validator = require('validator');
const { retrieve } = require('../blob.js');

router.get('/',
  async function(req, res) {
    if (!req.session.userId) {
      res.redirect('/')
    } else {
      const result = await retrieve()
        
    const params = {
        active: { image: true },
        data: result
      };
      console.log(params)
      res.render('images', params);
    }
  }
);

module.exports = router;