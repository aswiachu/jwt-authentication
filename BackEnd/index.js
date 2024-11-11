const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const secretKey = "abcdefg";

const users = [];

//Signup
app.post('/signUp', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send("Username and password are required");
        }

        const hashedPswd = await bcrypt.hash(password, 10);
        users.push({ username, password: hashedPswd });

        console.log(users);
        res.status(201).send("User created successfully");
    } catch (error) {
        res.status(500).send("Error creating user");
    }
});

//Login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = users.find(u => u.username === username);

        if (!user) return res.status(400).send("User not found");
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) return res.status(400).send("Invalid password");

        const token = jwt.sign({ username: user.username }, secretKey);
        res.send({ token });

    } catch (error) {
        res.status(500).send("Error logging in user");
    }
});

//middleware
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; 
    console.log(token);
    if (!token) return res.status(401).send("Request Denied");

    try {
        const verified = jwt.verify(token, secretKey);
        req.user = verified; 
        next(); 
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
};

//profile Route
app.get('/profile', verifyToken, (req, res) => {
    res.send(`Welcome ${req.user.username}`);
});

app.listen(5000, () => console.log("Backend is running on port 5000"));
