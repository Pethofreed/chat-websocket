const path = require('path');
const express = require('express');
const app = express();
const socketIO = require('socket.io');

//setings
app.set('port', process.env.PORT || 8000);

//app static
app.use(express.static(path.join(__dirname, 'public')));

//start server
const server = app.listen(app.get('port'), () => {
  console.log(`App running on port ${app.get('port')}`);
});

const io = socketIO(server);

//web sockets
io.on('connection', (socket) => {
  console.log('New connection')

  socket.on('chat:message', (data) => {
    io.sockets.emit('chat:message', data)
  })

  socket.on('chat:typing', (data) => {
    socket.broadcast.emit('chat:typing', data)
  })
})
