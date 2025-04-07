import express from 'express';
import multer from 'multer';
import Query from "./db.js";
import morgan from 'morgan';
import cors from 'cors';
import fs from'fs';

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


const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Server On");
});

app.listen(4000, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



app.post('/upload', pdfUpload.single('pdf'), (req,res) => {
    const pdf = req.file;
    if (!pdf) {
        res.status(400).send("File not uploaded");
        console.log("FILE NOT UPLOADED");
    } else {
        res.status(200).send("Pdf uploaded successfully");
        console.log("PDF UPLOADED");
        console.log(pdf);
    }
});

async function savePdf(filePath,fileName){
    try{
        const sql = "INSERT INTO files (file, file_name) values (?,?)";
        const fileData = fs.readFileSync(filePath);
        const params = [fileData, fileName];
        const result = await Query(sql,params);
        console.log("File saved to db",result);
    } catch (err) {
        console.error('Error saving PDF to database:', err);
    }
};

const filePath = "C:/Users/spora/OneDrive/Desktop/mysql training/uploads/test.pdf";
const fileName = "test.pdf";
// savePdf(filePath,fileName);

async function getPdf(id, outputPath){
    try{
        const sql = "SELECT file, file_name FROM files WHERE id = ?";
        const rows = await Query(sql, [id]);

        if (rows.length > 0) {
            const {file, file_name} = rows [0];
            fs.writeFileSync(outputPath || file_name, file);
            console.log("File retrived successfully!");
        } else {
            console.log("File not found!");
        }
    } catch (err) {
        console.error('Error retrieving PDF from database:', err);
    }
}

const id = 1;
const outputPath = "./saved/test.pdf";

// getPdf(id, outputPath);

