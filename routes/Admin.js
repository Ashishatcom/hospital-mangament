const express = require('express');
const router = express.Router();
const {Doctordata} = require('../models')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const falsh =  require('connect-flash')
const LocalStrategy = require('passport-local').Strategy



const authCheck = (req,res,next)=>{
  if(!req.user){
  console.log()
  res.redirect('/admin/login')
  }else{
  next();
  }
  }

/* GET users listing. */
router.get('/', authCheck,(req, res, next)=> {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.render('index')
});
// router.get('/register', function(req, res, next) {
//   res.render('register')
// });

// router.post('/register', function(req, res, next) {
//   const {name,email,password,password2}= req.body;
//     req.checkBody('name',  'Display Name field is required').notEmpty();
//     req.checkBody('email',        'Email field is required').notEmpty();
//     req.checkBody('email',        'Email field is required').isEmail();
//     req.checkBody('password',        'Password field is required').notEmpty();
//     req.checkBody('password',     'password is To Small').isLength({min:5});
//     req.checkBody('password2','Password and Confirm Password Do not Match').equals(req.body.password);
//     var err = req.validationErrors();
//     if(err){
//         return res.render('register',{"err":err,"username":name,"email":email})
//     }  else{
//     var formdata = {
//       Name: req.body.name,
//       email: req.body.email,
//       password:req.body.password,
//       // conpassword: req.body.cnpassword,
//       roles:req.body.role
//      }
//       Doctordata.findOne({ where:{email:req.body.email}})
//              .then(user=>{
//              if(!user){
//                 const hash = bcrypt.hashSync(formdata.password,10)
//                 formdata.password = hash
//                 Doctordata.create(formdata)
//                 .then(user=>{
//                     // res.json(user)
//                     // req.flash('success_msg','You are now registered and can log in'  );
//                     res.redirect('/admin/login')
//                 }).catch(err=>{
//                     res.send('error:'+ err)
//                 })
//              }else{
//                  res.json({error:"User alredy exist"})
//              }
//       })
//     }
// });

router.get('/login', function(req, res, next) {
  res.render('login')
});

router.post('/login',(req,res,next) => {
  // console.log(req.body)
  const adminRole = req.body.role
  Doctordata.findOne({where:{email:req.body.email}})
  .then(data=>{
    if(data.roles == adminRole){
      passport.authenticate('local',{
        successRedirect:'/admin',
        failureRedirect:'/admin/login',
        // failureFlash:true
    })(req,res,next);
    }else{
      res.redirect('/admin/login')
    }
  })
})
router.get('/logout',(req,res) => {
  req.logout();
  res.redirect('/')
})
router.get('/edit', authCheck,(req, res, next)=> {
    res.render('edit')
  });
  router.get('/pages', authCheck,(req, res, next)=>{
    res.render('pages')
  });
  router.get('/posts', authCheck,(req, res, next)=> {
    res.render('posts')
  });
  router.get('/users', authCheck,(req, res, next) =>{
    res.render('users')
  });
  

module.exports = router;
