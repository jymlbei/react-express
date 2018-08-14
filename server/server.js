const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')


const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)

// app.get('/',function(req,res){
//     res.send('<div>123</div>')
// })
app.listen(1745,function(){
    console.log('listenning in port 1745');
})
