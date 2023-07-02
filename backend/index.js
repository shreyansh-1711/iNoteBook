const connectToMongo = require(`${__dirname}/db`);
const express = require('express');
const cors = require('cors');

connectToMongo();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// AVAIABLE ROUTES
app.use('/api/auth', require('./routes/authRouter'));
app.use('/api/notes', require('./routes/notesRouter'));

app.listen(port, ()=> {
    console.log(`server listening at http://localhost:${port}`);
});