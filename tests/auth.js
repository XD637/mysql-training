import express from 'express';


const app = express();
app.use(express());

app.use((req,res,next) => {
    const time = new Date().toISOString();
    console.log(`[${time}], ${req.method},`)
});



const PORT = 3001;

const users = [];

app.get('/', (req, res) => {
    res.send("Auth Test App");
});

app.listen(4000, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('')