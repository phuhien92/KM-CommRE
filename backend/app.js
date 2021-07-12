const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getAgents, getPropertyTypesBy, getPropertySales } = require('./database');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/agents', (req, res) => {
    const agents = getAgents();

    res.status(200);
    res.json(agents);
});

app.get('/property-sales', (req, res) => {
    const { agent } = req.params;

    res.status(200);
    res.json(getPropertySales(agent));
});

app.get('/property-types/:agent', (req, res) => {
    const { agent } = req.params;

    res.status(200);
    res.json(getPropertyTypesBy(agent));
});

app.use(express.static(path.join(__dirname, '../public')));
app.listen(3001, 'localhost', () => {
    console.log('Server API is listening on 3001 port');
});