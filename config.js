import 'dotenv/config';

const pass = process.env.DATABASE_PASS;

const config_worldDB = {
    db: {
        host: 'localhost',
        user: 'root',
        password: pass,
        database: "world",
        waitForConnections: true,
        connectionLimit: 2,
        queueLimit: 0,
    },
};

const config_testDB = {
    db: {
        host: 'localhost',
        user: 'root',
        password: pass,
        database: "test",
        waitForConnections: true,
        connectionLimit: 2,
        queueLimit: 0,
    },
};

export { config_worldDB, config_testDB };
