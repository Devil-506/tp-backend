const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');


const app = express();
app.use(cors());
app.use(express.json());


const DATA_PATH = path.join(__dirname, 'data/qc_records.json');


app.get('/api/qc', async (req, res) => {
const records = await fs.readJSON(DATA_PATH);
res.json(records);
});


app.post('/api/qc', async (req, res) => {
const records = await fs.readJSON(DATA_PATH);
records.push(req.body);
await fs.writeJSON(DATA_PATH, records, { spaces: 2 });
res.json({ success: true });
});


// Serve production frontend
app.use('/', express.static(path.join(__dirname, '../frontend/dist')));


app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});


app.listen(5000, () => console.log('Backend running on http://localhost:5000'));