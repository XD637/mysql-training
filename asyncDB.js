import mysql from 'mysql2/promise';
import config from './config.js';

let db;

async function connectDatabase(){
    try {
        db = await mysql.createConnection(config.db);
        console.log("Database connected");
    }
    catch(err) {
        console.log("Error connecting to Database", err);
    }
};

connectDatabase();

export default db;