'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongodbUriUtil = require('mongodb-uri');
const config = require('./config.json');

let contacts = require('./data');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

const db = config.databaseConnection;
const mongodbUri = `mongodb://${db.username}:${db.password}@${db.host}:${db.port}/${db.database}`;
const mongooseUri = mongodbUriUtil.formatMongoose(mongodbUri);
const dbOptions = {};

app.get('/api/contacts',(req, res) => {
  if(!contacts){
    res.status(404).json({message: 'no contacts found'})
  }
  res.json(contacts);
})

app.get('/api/contacts/:id',(req,res)=>{
  const requestId = req.params.id;
  let contact = contacts.filter(contact => {
    return contact.id == requestId;
  })

  if(!contact){
    res.status(404).json({message: 'no contact found'})
  }

  res.json(contact[0]);
})

/*
app.post('/api/contacts',(req,res)=>{
  const payload = req.body
  const contact = {
    id: contacts.length + 1,
    first_name: payload.first_name,
    last_name: payload.last_name,
    email: payload.email,
    website: payload.website
  }
  contacts.push(contact);

  res.json(contact);
})
*/
app.use('/api/contacts', require('./api/contacts/routes/postContact'));

app.put('/api/contacts/:id', function (req, res) {
  const requestId = req.params.id;
  let contact = contacts.filter(contact => {
    return contact.id == requestId;
  })[0];

  const index = contacts.indexOf(contact);

  const keys = Object.keys(req.body);
  keys.forEach(function(key) {
    contact[key] = req.body[key]
  });
  contacts[index] = contact
  res.json(contacts[index]);
});

app.delete('/api/contacts/:id', function (req, res) {
  const requestId = req.params.id;
  let contact = contacts.filter(contact => {
    return contact.id == requestId;
  })[0];

  const index = contacts.indexOf(contact);

  contacts.splice(index,1);

  res.json({message: `User with contact id: ${requestId} has been deleted`})
});



const hostname = 'localhost'
const port = 3001;

app.listen(port, hostname, () => {
  mongoose.connect(mongooseUri, dbOptions, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`Server running at http://${hostname}:${port}/`);
  });
});
