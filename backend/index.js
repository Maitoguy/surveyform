const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 8000;

const db = require('./config/mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use('/', require('./routes/index'));

app.listen(port, function(err) {
    if (err) {
      console.log(`Error in running the server: ${port}`);
    }
  
    console.log(`Server is running on port: ${port}`);
});
