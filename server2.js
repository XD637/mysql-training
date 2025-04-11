import express from 'express';
import router from './router.js';

const app = express();

app.use('/api', router);
app.use(express.json());


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

//routes

///http://localhost:3000/api/city - GET

//http://localhost:3000/api/city - POST 