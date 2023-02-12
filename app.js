const express = require('express');
const app = express();
const cors = require('cors');
const signRouter = require('./controller/user/sign-router');
// const auth  = require('./controller/auth');
const loginRouter = require('./controller/user/login-router');
const loginAdmin = require('./controller/admin/login-router');
const quizRouter = require('./controller/quiz/quiz-router');
const editRouter = require('./controller/user/edit-router');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());    
app.get('/',(req,res)=>{
    res.send("hello world");
})
//user sign up 
app.use('/user',signRouter);
// user login 
app.use('/user',loginRouter);
//user edit profile
app.use('/user',editRouter);
//admin login
app.use('/admin',loginAdmin);
//adding exam
app.use('/quiz',quizRouter);


let port = process.env.PORT || 3000 ;
app.listen(port,()=>{console.log(`server run on port ${port}`)});