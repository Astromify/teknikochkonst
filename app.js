const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/pixels', (req, res) => {
    fs.readFile('pixels.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.post('/pixels', (req, res) => {
    const pixel = req.body;

    fs.readFile('pixels.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        const pixels = JSON.parse(data);
        pixels.push(pixel);
        fs.writeFile('pixels.json', JSON.stringify(pixels), 'utf8', err => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
                return;
            }
            res.sendStatus(200);
        });
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
