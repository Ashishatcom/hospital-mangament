const LocalStrategy = require('passport-local').Strategy;
const {Doctordata,Patient} = require('../models');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
        passport.use('local',
        new LocalStrategy({usernameField: 'email'},(email,password,done)=>{
                // Match User
                Doctordata.findOne({where:{email:email}})
                .then(user=>{
                    // console.log(user.roles)
                    if(!user){
                        console.log('The email is not registered');
                        return done(null,false,{message:'The email is not registered'});
                        
                    } else if(user){
                            bcrypt.compare(password,user.password,(err,isMatch) => {
                                if(err) throw err;
        
                                if(isMatch){
                                    return done(null,user);
                                }else{
                                    console.log(password,user.password);
                                    return done(null,false,{message:'Password Incorrect'})
                                }
                            })
                    }
                    else{
                         // Match password 
                         return done(null,false,{message:'You Are not a Admin'});
                    }
                })
        })
    )
    //Patient-local Strategy
    passport.use('patient-local',
        new LocalStrategy({usernameField: 'email'},(email,password,done)=>{
                // Match User
                Patient.findOne({where:{email:email}})
                .then(user=>{
                    // console.log(user)
                    if(!user){
                        console.log('The email is not registered');
                        return done(null,false,{message:'The email is not registered'});
                    }
                    if(user){
                        bcrypt.compare(password,user.password,(err,isMatch) => {
                            if(err) throw err;
    
                            if(isMatch){
                                return done(null,user);
                            }else{
                                console.log(password,user.password);
                                return done(null,false,{message:'Password Incorrect'})
                            }
                        })
                    }else{
                         // Match password 
                         return done(null,false,{message:'You Are not a Admin'});
                    }
                })
        })
    )
    // end
    passport.serializeUser(function(user,done){
        if (user instanceof Doctordata) {
            done(null, { id: user.id, type: 'Doctordata' });
          } else {
            done(null, { id: user.id, type: 'User' });
          }
    })

    passport.deserializeUser(function(obj,done){
        if(obj.type==='Doctordata'){
            Doctordata.findByPk(obj.id).then(function (user) {
                if (user) {
                    done(null, user.get());
                } else {
                    done(user.errors, null);
                }
            }); 
        }else{
            //Patient
        Patient.findByPk(obj.id).then(function (user) {
          if (user) {
              done(null, user.get());
          } else {
              done(user.errors, null);
          }
      });  

        }
        

        

     })

}