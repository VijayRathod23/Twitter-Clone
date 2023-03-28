


// pages 
// signup
// login
// get -profile
// put - profile

// auth -> register, login, forget, 

app.use("/auth", authRouter)



app.use("/retweet",retweet)
const register=require('./Routes/register')
app.use('/',register);

const login=require('./Routes/login')
app.use('/',login);

const home=require('./Routes/home')
app.use('/',home);

const profile=require('./Routes/profile')
app.use('/',profile);

const comment=require('./Routes/comment')
app.use('/',comment);

const retweet=require('./Routes/retweet')
app.use('/',retweet);

const follow=require('./Routes/follow')
app.use('/',follow);

const forgot=require('./Routes/forgot')
app.use('/',forgot);

