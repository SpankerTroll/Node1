
const EventEmitter = require('events');
const emitter = new EventEmitter();

// Register listener
emitter.on('Logging', function(arg){
    console.log('Logging Device', arg);
});

const log = require('./logger');
log('message');

