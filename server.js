//Required files
const express = require('express');
const fs = require('fs');
//calling express and PORT
const app = express();
const PORT = process.env.PORT || 3001;
//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', api);
app.use(express.static('public'));

//GET route
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname,'/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App started at http://localhost:${PORT}`)
);


