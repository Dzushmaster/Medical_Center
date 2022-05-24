require('dotenv').config();
const express = require("express")
const jwt = require('jsonwebtoken')
const fs = require('fs')
const app = express()
const options = {
    passphrase: "qwerty",
    key: fs.readFileSync("openssl/CA.key").toString(),
    cert: fs.readFileSync("openssl/CA.crt").toString()
}
const httpsServer = require('https')
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer, {
    cors:{
        origin: '*'
    }
})
const {addUser, getUser, removeUser, getUsersInRoom} = require('./users');
const sequelize = require('./db')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/errorApiMiddleware')
const cors = require('./middleware/cors')
const router = require('./routers/index')
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

const onConnection = (socket)=>{
    socket.on('join', ({name, room}, callback)=>{
        const {error, user} = addUser({id: socket.id, name:name, room:room})
        if(error) return callback(error)
        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}. Here you can ask any questions and other people will help you`})
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined!`})
        socket.join(user.room)
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
        callback()
    })
    socket.on('sendMessage', (message, callback)=>{
        const user = getUser(socket.id)
        io.to(user.room).emit('message', {user: user.name, text:message})
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

        callback()
    })
    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id)
        if(user)
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left`})
    })
}
io.on('connection', onConnection)
const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT || 5001
const PORT = process.env.PORT || 5000
const start = async ()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        httpServer.listen(WEBSOCKET_PORT, ()=>console.log(`Web socket server: http://localhost:${WEBSOCKET_PORT}`))
        httpsServer.createServer(options, app).listen(PORT, ()=> console.log(`Common server: https://localhost:${PORT}/api`))
    }catch(e){
        console.log(e)
    }
}
start();
