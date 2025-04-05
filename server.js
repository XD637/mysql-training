import express from 'express';
import multer from 'multer';
import Query from "./db.js";
import morgan from 'morgan';
import cors from 'cors';

let storage = multer.diskStorage(
    {
        destination: function (req, file, cb){
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    }

);

const pdfUpload = multer({storage: storage});

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


const PORT = 4000;

app.get('/', (req,res) => {
    res.send("Server On");
});

app.listen(4000, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/city', async (req,res) => {
    try {
        const results = await Query("SELECT * FROM city LIMIT 5");
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
        const results = await Query("INSERT INTO city(Name,CountryCode,District,Population) VALUES(?,?,?,?);", [req.body.Name, req.body.CountryCode, req.body.District, req.body.Populaion]);
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



app.post('/upload', pdfUpload.single('pdf'), (req,res) => {
    const pdf = req.file;
    if (!pdf) {
        res.status(400).send("File not uploaded");
        console.log("FILE NOT UPLOADED");
    };
    res.status(200).send("Pdf uploaded successfully");
    console.log("PDF UPLOADED");
    console.log(pdf);
});




