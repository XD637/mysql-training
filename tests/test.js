import events from 'events';
import crypto from 'crypto';


//events
const event = new events.EventEmitter();

const eventHandler = () => {
    console.log("I hear a scream");
}

event.on('scream', eventHandler);

event.emit('scream');

//jsons and objects
const jsonstring = '{"title": "JavaScript Basics", "price": 10}'

console.log(JSON.parse(jsonstring));

const object = { name: "Backend API", version: 1.0, status: "active" }

console.log(JSON.stringify(object));

//crypto
const pass = 'Sporada';
const hashed = crypto.createHash('sha256').update(pass).digest('hex');
console.log(hashed);


