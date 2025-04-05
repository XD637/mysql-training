import 'dotenv/config'
const pass = process.env.DATABASE_PASS;
const config = {
    db: {
        host: 'localhost',
        user: 'root',
        password: pass,
        database: "world",
        waitForConnections: true,
        connectionLimit: 2,
        queueLimit: 0
    }
};

export default config;