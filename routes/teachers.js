var express = require('express');
var router = express.Router();

var teacherDao = require('../dao/teacherDao.js');
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Teacher' });
});

// 增加用户
//TODO 同时支持get,post
router.get('/addTeacher', function(req, res, next) {
  console.log('start add teacher')
	teacherDao.add(req, res);
});

router.get('/deleteTeacher', function(req, res, next) {
	teacherDao.delete(req, res, next);
});

router.get('/queryByName', function(req, res, next){
  teacherDao.queryByName(req, res, next);
});

router.get('/queryBySid', function(req, res, next){
  teacherDao.queryBySid(req, res, next);
});


module.exports = router;
