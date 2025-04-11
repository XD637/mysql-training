import express from 'express';
import Query from "./db.js";
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10
});

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(limiter);
app.use(helmet());

app.get('/', (req, res) => {
    res.send("Server On");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//routes

//http://localhost:3000/v1/city - GET
//http://localhost:3000/v2/city - GET
//http://localhost:3000/country - GET
//http://localhost:3000/add-city - POST
//http://localhost:3000/update-city - PUT
//http://localhost:3000/delete-city - DELETE


app.get('/v1/city', async (req,res) => {
    try {
        const results = await Query("SELECT * FROM city LIMIT 10");
        res.status(200).json(results);
    } catch(err) {
        res.status(500).json({error: "Failed to fetch city"});
    }
})

app.get('/v2/city', async (req,res) => {
    try {
        const limit = parseInt(req.query.limit) || 20;
        const offset = parseInt(req.query.offset) || 0;
        const results = await Query("SELECT * FROM city LIMIT ? OFFSET ?", [limit, offset]);
        res.status(200).json(results);
    } catch(err) {
        res.status(500).json({error: "Failed to fetch city"});
    }
})

app.get('/country', async (req,res) => {
    try {
        const results = await Query("SELECT * FROM country limit 10")
        let processedResults = results.map(rows => {
            let keyValuePairs = {};
            for (let key in rows) {
            keyValuePairs[key] = rows[key];
            }
            return keyValuePairs;
        });

        res.json(processedResults);
    } catch (err) {
        res.status(500).json({error: "Failed to fetch country"});
    }
});
app.post('/add-city', async (req,res) => {
    try{
        const results = await Query("INSERT INTO city (Name,CountryCode,District,Population) VALUES (?,?,?,?)", [req.body.Name, req.body.CountryCode, req.body.District, req.body.Population]);
        res.status(201).json(results);
    } catch(err) {
        res.status(500).json({error: "Failed to add city"});
    }
});

app.put('/update-city/:id', async (req,res) => {
    try {
        const results = await Query("UPDATE city SET Name = ? WHERE ID = ?;", [req.body.Name, req.params.id]);
        res.status(200).json(results);
    } catch(err) {
        res.status(500).json({error: "Failed to fetch city"});
    }
});

app.delete('/delete-city/:id', async (req,res) => {
    try {
        const results = await Query("DELETE FROM city WHERE ID = ?;", [req.params.id]);
        res.status(200).json(results);
    } catch(err) {
        res.status(500).json({error: "Failed to fetch city"});
    }
});




