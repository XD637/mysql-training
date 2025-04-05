import config from './config.js';
import mysql from 'mysql2/promise';
const pool = mysql.createPool(config.db);

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
