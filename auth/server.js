import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

dotenv.config();
const PORT = 5000;

const app = express();
app.use(express.json());

app.listen(5000, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

app.get('/', (req,res) => {
    res.json("Welcome to Express Auth");
})

let users = [{
    id: 1,
    username: 'admin',
    pass: 'Sporada'
}]
console.log(users[0].pass);



async function hashedPass(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password :>> ', hashedPassword);
    return hashedPassword; 
}

(async function () {
    users[0].pass = await hashedPass(users[0].pass); 
    console.log("Updated User:", users);
})();


const authToken = (req,res,next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied'})
    jwt.verify(token, process.env.JWT_SECRET, (err,user) =>{
        if (err) {
            return res.status(403).json({error : 'invalid token'});
        }
        req.user = user;
        next();
});
};

app.post('/login', async(req,res) =>{
    console.log('Request Body:', req.body);
    const {username, pass } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) return res.status(404).json({error: 'User not found'});
    const validPassword = await bcrypt.compare(pass, user.pass);
    if (!validPassword) return res.status(403).json({error: 'Invalid Password'});

    const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.status(200).json({ message: 'Login successful', token });
})

app.get('/protected', authToken, (req, res) => {
    res.status(200).json({message: `Hello ${req.user.username}`})
})
