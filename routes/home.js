var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.collection('fir').find({}).toArray(function(err,result){
    if(err){
      console.log(err);
    }
    else{
//console.log(result);

    db.collection('status').find({}).toArray(function(err,status){
      if(err){

      }else{

        var obj = {};
        obj.status =status;
        obj.result = result;
        obj.layout = 'main';
        console.log("first");
        console.log(obj);
        res.render('home', obj);
      }
    });

    }
  });

});


module.exports = router;
