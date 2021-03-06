'use strict'

const net = require('net')
const fs = require('fs')

if(process.argv.length < 3)
    throw new Error('You must provide a file name!')

const args = process.argv.slice(2)

net
    .createServer(onNewConnection)
    .listen(3000)
console.log('Waiting for connections')

/**
 * Notified whenever a new connection is established.
 * @param {socket} socket 
 */
function onNewConnection(socket) {
    
    console.log('New connection')
    
    args.forEach(filename => {
        socket.write('Connnection established! Watching ' + filename + '\n\r')
        fs.watch(filename, onFileChanged.bind(null, socket, filename))
    })

    socket.on('close', onConnectionClose)
}
/**
 * Notified on file changes.
 * @param {Socket} socket 
 */
function onFileChanged(socket, filename) {
    socket.write('File ' + filename + ' changed at ' + new Date() + '\n\r')
}

function onConnectionClose() {
    console.log('Client closed the connection!')
}