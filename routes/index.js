const express = require('express');
const router = express.Router();
const {Doctordata,Patient,Doctorpatient} =require('../models')
const bcrypt = require('bcryptjs')
const passport = require('passport')


const authCheck = (req,res,next)=>{
  if(!req.user){
  res.redirect('/login')
  }else{
  next();
  }
  }


/* GET users listing. */
router.get('/',(req, res, next)=> {
  res.render('../views/Home/home')
});
router.get('/about',(req, res, next)=> {
  res.render('../views/Home/about')
});
router.get('/services',(req, res, next)=> {
  res.render('../views/Home/services')
});
router.get('/contact',(req, res, next)=> {
  res.render('../views/Home/contact')
});
router.get('/appointment',(req, res, next)=> {

  Doctordata.findAll({where:{roles:1}})
  .then(data=>{
    res.render('../views/Home/sechudle',{Doctordata:data})
  }).catch(err=>{
    console.log(err)
  })
});
router.post('/appointment',(req, res, next)=> {
  const {firstname,lastname,email,address,Mobile,selectdoctor,appointmentdatae,desc,password,password2}= req.body;
    req.checkBody('firstname',  'First Name field is required').notEmpty();
    req.checkBody('lastname',        'Last Name field is required').notEmpty();
    req.checkBody('email',        'Email field is required').notEmpty();
    req.checkBody('email',        'Email field is required').isEmail();
    req.checkBody('address',        'Email field is required').notEmpty();
    req.checkBody('Mobile',        'Email field is required').notEmpty();
    req.checkBody('selectdoctor',        'Email field is required').notEmpty();
    req.checkBody('appointmentdatae',        'Email field is required').notEmpty();
    req.checkBody('desc',        'Email field is required').notEmpty();
    req.checkBody('password',        'Password field is required').notEmpty();
    req.checkBody('password',     'password is To Small').isLength({min:5});
    req.checkBody('password2','Password and Confirm Password Do not Match').equals(req.body.password);
    var err = req.validationErrors();
    if(err){
        return res.render('register',{"err":err,"username":firstname,"email":email})
    }  else{
    var formdata = {
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      email:req.body.email,
      selectdoctor:req.body.selectdoctor,
      date:req.body.appointmentdatae,
      descriptation:req.body.desc,
      address:req.body.address,
      mobile :req.body.Mobile,
      password:req.body.password,
      password2:req.body.password2,
      // conpassword: req.body.cnpassword,
      roles:req.body.role
     }
     Patient.findOne({ where:{email:req.body.email}})
             .then(user=>{
             if(!user){
               bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(formdata.password,salt,(err,hash)=>{
                  formdata.password = hash
                  Patient.create(formdata)
                  .then(user=>{
                    //  res.json({message:user})
                     
                     Doctorpatient.create({patientid:user.id}).then(createid=>{
                      //  console.log(createid)
                      res.redirect('/login')
                     })
                    //  console.log(user.id)
                    
                  }).catch(err=>{
                    console.log(err)
                  })
                })
               })
             }else{
                 res.json({error:"User alredy exist"})
             }
      })
    }
});
router.get('/login',(req,res,next)=>{
  res.render('../views/Home/user-login')
})
router.post('/login',(req,res,next) => {
  passport.authenticate('patient-local',{
      successRedirect:'/',
      failureRedirect:'/login',
      // failureFlash:true
  })(req,res,next);

})

module.exports = router;
