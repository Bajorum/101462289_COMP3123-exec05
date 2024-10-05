const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const router = express.Router();

app.use(express.json()); 


router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});


router.get('/profile', (req, res) => {
    fs.readFile(__dirname + '/user.json', (err, data) => {
        if (err) throw err;
        const user = JSON.parse(data);
        res.json(user);
    });
});


router.post('/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile(__dirname + '/user.json', (err, data) => {
        if (err) throw err;
        const user = JSON.parse(data);

        if (username !== user.username) {
            res.json({ status: false, message: "User Name is invalid" });
        } else if (password !== user.password) {
            res.json({ status: false, message: "Password is invalid" });
        } else {
            res.json({ status: true, message: "User Is valid" });
        }
    });
});


router.get('/logout', (req, res) => {
    const username = req.query.username;
    res.send(`<b>${username} successfully logged out.</b>`);
});


app.use((err, req, res, next) => {
    res.status(500).send('Server Error');
});

app.use('/', router);

app.listen(process.env.port || 8081, () => {
    console.log('Web Server is listening at port ' + (process.env.port || 8081));
});
