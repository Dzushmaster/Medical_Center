const express = require('express')
const http = require('http')
const app = express()
const httpServer = http.createServer(app)
const io = require('socket.io')(httpServer, {
    cors:{
        origin: '*'
    }
})
const router = require('./router')
const {addUser, getUser, removeUser, getUsersInRoom} = require("../users");
io.on('connection',(socket)=>{
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
})
app.use(router)
httpServer.listen(5000, ()=>console.log('http server'))

