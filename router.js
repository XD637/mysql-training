import express from "express";
import Query from "./db.js";

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
    res.send("Server On");
});



router.get('/city', async (req,res) => {
    try {
        const results = await Query("SELECT * FROM city LIMIT 10");
        res.status(200).json(results);
    } catch(err) {
        res.status(500).json({error: "Failed to fetch city"});
    }
})

router.post('/city', async (req,res) => {
    try{
        const results = await Query("INSERT INTO city (Name,CountryCode,District,Population) VALUES (?,?,?,?)", [req.body.Name, req.body.CountryCode, req.body.District, req.body.Population]);
        res.status(201).json(results);
    } catch(err) {
        res.status(500).json({error: "Failed to add city"});
    }
});

export default router;