'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
let contacts = require('./data');

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.get('/api/contacts',(request, response) => {
  if(!contacts){
    response.status(404).json({message: 'no contacts found'})
  }
  response.json(contacts);
})

const hostname = 'localhost'
const port = 3001;

app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});
