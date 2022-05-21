const {nanoid} = require('nanoid')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('messages.json')
const db = low(adapter)
db.defaults({
    messages:[
        {
            messageId: 1,
            userId: 1,
            senderName: 'Bob',
            messageText: 'What did y do here before a came?',
            createdAt: '2021-01-14'
        },
        {
            messageId: 2,
            userId: 2,
            senderName: 'Alice',
            messageText: 'I just want that someone help me',
            createdAt: '2021-01-15'
        }
    ]
}).write()
module.exports = (io, socket)=> {
    const addMessage = (message) => {
        db.get('messages')
            .push({
                messageId: nanoid(8),
                createdAt: new Date(),
                ...message
            })
            .write()
        getMessages()
    }
    const getMessages = ()=>{
        const messages = db.get('messages').value()
        io.in(socket.roomId).emit('messages', messages)
    }
    const removeMessage = (messageId)=>{
        db.get('messages').remove({messageId}).write()
        getMessages()
    }
    socket.on('message:get', getMessages())
    socket.on('message:add', addMessage())
    socket.on('message:remove', removeMessage())
}