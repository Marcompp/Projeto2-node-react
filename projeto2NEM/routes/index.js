var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = require("../db");
  var Users = db.Mongoose.model('usercollection', db.userSchema,'usercollection');

  console.log("AAAAAAAAAAAAAA")
  console.log(Users)
  Users.find({}).lean().exec(
    function (e,docs) {
      //res.render('userlist', { 'userlist' : docs });
      res.json(docs);
      res.end()
    }
  )
});

/* POST ONE users page. */
router.post('/users/', function(req, res,next) {
  var db = require("../db");
  var User = db.Mongoose.model('usercollection', db.userSchema,'usercollection');
  console.log("AAAAAAAAAAAAAA");
  console.log(req.body.username);
  var newuser= new User({ username:req.body.username,email:'abc@insper.edu.br' });
  console.log(newuser);
  newuser.save({function (err) {
    if (err) {
      res.status(500).json({ error:err.message });
      res.end();
      return;
    }
    res.json(newuser);
    res.end();
  }});
});
module.exports = router;