const passport = require('passport'),
User = require('../models/user'),
GoogleStrategy = require('passport-google-oauth20');


passport.serializeUser((user, done)=>{
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        
        if (err) {
            throw err;
        }

        console.log('deserializing user', id);
        done(null, user);
    });
});


passport.use(
    new GoogleStrategy({
    callbackURL:'/auth/google/profile',
    clientID:'781091049516-9lsphslcdqamgkomsisom3s2l5rjfq96.apps.googleusercontent.com',
    clientSecret:'r_5XN9QjGY305Cn_daDyjj57'
}, (accessToken, refreshToken, profile, done)=>{
   
    User.findOne({googleId: profile.id})
    .then((currentUser)=>{
           if(currentUser){
               console.log('user found');
               done(null, currentUser);
           } else{
            new User({
                name: profile.displayName,
                googleId: profile.id,
                image: profile.photos[0].value,
                email: profile.emails[0].value
            }).save()
            .then((newUser)=>{
                console.log(newUser);
               done(null, currentUser);

            })
           }
    })
    
       
       
})
)