import {config_testDB, config_worldDB} from './config.js';
import mysql from 'mysql2/promise';


// const pool = mysql.createPool(config_testDB.db);
const pool = mysql.createPool(config_worldDB.db);


async function Query(sql, params){
    try {
        const [rows] = await pool.query(sql, params);
        return rows;
    }
    catch (err) {
        console.log(err);
    }
}
export default Query;