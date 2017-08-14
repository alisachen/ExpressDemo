var express = require('express');
var router = express.Router();

var teacherDao = require('../dao/teacherDao.js');
var userDao = require('../dao/userDao');
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Jenkins' });
});

router.get('/queryUserByTeacherName', function(req, res, next) {
  console.log('Query User by Teacher Name');
   var name = req.query.name;
	teacherDao.queryByNameCB(req, res, function(result){
    var sid_string = " ";
    for(let i=0; i< result.length; i++){
      if(i === result.length -1){
        sid_string += result[i].sid
      }else{
        sid_string += result[i].sid + ','
      }      
    }
  req.query.id = sid_string;
  userDao.queryById(req, res, next);  
  });
});

router.get('/queryTeacherByUserName', function(req, res, next){
  console.log('Query Teacher by User Name');
  var name = req.query.name;
  userDao.queryByNameCB(req, res, function(result){
    result= JSON.parse(result.substring(1, result.length-1));
    console.log(result);
    req.query.sid = result.id;
    teacherDao.queryBySid(req, res, next);
  });
});



module.exports = router;
