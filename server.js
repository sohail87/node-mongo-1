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


app.use('/api/contacts', require('./api/contacts/routes/getContacts'));
app.use('/api/contacts', require('./api/contacts/routes/getContact'));
app.use('/api/contacts', require('./api/contacts/routes/postContact'));
app.use('/api/contacts', require('./api/contacts/routes/putContact'));
app.use('/api/contacts', require('./api/contacts/routes/deleteContact'));


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
