var express = require('express');
var session = require('express-session');

var router = express.Router();

const Doctor = require('../Model/doctorProfile.model');
const Seeprofile = require('../Model/seeProfile.model');

/* GET home page. */
router.post('/login', function(req, res, next) {
  //  if(req.session.uid){
   var uid = req.body.uid;
    Doctor.findOne({uid: uid},(err,data)=>{
      if(err){
         res.json('false');
         console.log(uid);
      }
      else if(data){
        res.json('true');
      }
      else{
         res.json('false');
      }
    })
  //   }
  // else
  //     res.json("false");
    
});


router.post('/profile', function(req, res, next) {
  var uid = req.body.uid;
  Doctor.findOne({uid: uid},(err,data)=>{
    if(err){
      res.json('false');
    }
    else{
      res.json(data);
    }
  })
});

router.post('/seeprofile', function(req, res, next) {
  var uid = req.body.uid;
  Doctor.findOne({uid: uid},(err,data)=>{
    if(err){
      res.json('false');
    }
    else{
      var doctor =  new Seeprofile(data);
      res.json(doctor);
    }
  })
});

module.exports = router;
