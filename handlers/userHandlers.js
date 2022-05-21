const {nanoid} = require('nanoid')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('users.json')
const db = low(adapter)
db.defaults({
    users:[
        {
            userId: 1,
            username: 'Bob',
            online: false
        },
        {
            userId: 2,
            username: 'Alice',
            online: false
        }
    ]
}).write()
module.exports = (io, socket)=>{
    const addUser = ({username, userId})=>{
        if(!db.get('users')[userId])
            db.get('users').push({
                userId: userId,
                username: username,
                online: true
            })
        else
            db.get('users')[userId].online = true
        getUsers()
    }
    const getUsers = ()=>{
        const users = db.get('users').value()
        io.in(socket.roomId).emit('users', users)
    }
    const removeUser = (userId)=>{
        db.get('users')[userId].online = false
        getUsers()
    }
    socket.on('user:get', getUsers)
    socket.on('user:add', addUser)
    socket.on('user:leave', removeUser)
}