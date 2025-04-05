import events from 'events';

const event = new events.EventEmitter();

const eventHandler = () => {
    console.log("I hear a scream");
}

event.on('scream', eventHandler);

event.emit('scream');

let firstName = "Dylan"; // inferred to type string
firstName = 33;