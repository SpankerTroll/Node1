
const EventEmitter = require('events');
const emitter = new EventEmitter();

var url = 'http://mylogger.io/log';

function log(message) {
    //  Send an HTTP request
    console.log(message);
    // Register Log emitter
    emitter.emit('Logging', {id: 1, url: 'logging'});
}

