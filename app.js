const express = require('express'),
      mongoose = require('mongoose'),
      app = express(),
      passportoauth = require('./controllers/passportoauth'),
      cookiesession = require('cookie-session'),
      passport = require('passport');


 //MONGOOSE CONNECTIONS   
const uri = "mongodb+srv://faizalwho:qwerty123@cluster0.lz45d.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose.connect(uri, 
    {useUnifiedTopology: true, useNewUrlParser: true},
     ()=>{
    console.log('connected!');
})

app.set('view engine', 'ejs');

//COOKIE SETTINGS
app.use(cookiesession({
    maxAge: 2*60*60*1000,
    keys: ['qwerty']
}))
app.use(passport.initialize());
app.use(passport.session());



//ROUTER
const authroutes = require('./routes/authroutes');

app.use('/auth', authroutes);

app.get('/', (req,res)=>{
    res.render('home');
})


app.listen(3000, ()=>{
    console.log('App Running on Port:3000');
})