const { Router } = require('express'),
      passport = require('passport');

const router = require('express').Router();



//Oauth google login
router.get('/google', passport.authenticate('google', 
{
    scope: ['profile', 'email']
}
))


//USER PROFILE
router.get('/google/profile',passport.authenticate('google'), (req, res)=>{ 
    res.redirect('/auth/profile');
 }
)


router.get('/profile', (req, res)=>{ 
    res.render('profile', {user: req.user});
 }
)

//LOGOUT ROUTES
router.get('/logout',(req, res)=>{
    req.logout();
    res.redirect('/')
})


module.exports = router;