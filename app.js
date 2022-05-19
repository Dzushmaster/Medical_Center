require('dotenv').config();
const express = require("express")
const jwt = require('jsonwebtoken')
const sequelize = require('./db')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/errorApiMiddleware')
const cors = require('./middleware/cors')
const router = require('./routers/index')
const app = express()
app.use(cors)
app.use(express.json())
app.use((req, res, next)=>{
    if(req.headers.authorization){
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_ACCESS_KEY, (err, payload)=>{
            if(err) next()
            else if(payload){
                req.payload = payload
                next()
            }
        })
    }else next()
})
app.use('/api', router)
app.use(cookieParser())


app.use(errorHandler)


const PORT = process.env.PORT || 4000;
const start = async ()=>{
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        
        app.listen(PORT);
        console.log(`http://localhost:${PORT}/api`);
    }catch(e){
        console.log(e);
    }
}
start();
