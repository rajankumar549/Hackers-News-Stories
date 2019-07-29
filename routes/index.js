var express = require('express');
var router = express.Router();
var controller = require('./../controller')
// Import the Google Cloud client library


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/articles', async function(req, res, next) {
  var result;
  var allowedParmas = ["text","title","url"]
  var params = [];
  allowedParmas.forEach(function(e){
    var value = req.query[e]
    if (value) {
      params.push({name: e,value:value})
    }
    
  });
  try{
    result = await controller.NewsActions.Search(params);
  } catch (e){
    console.log(e);
    result=e.toString();
  }
  
  res.json({
    "ping":"pong",
    data:result
  });
});


module.exports = router;
