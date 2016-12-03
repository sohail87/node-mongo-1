'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); //8080

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.get('/api/contacts',(request, response) => {
  response.send('hello world');
})

const hostname = 'localhost'
const port = 3001;

app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});
