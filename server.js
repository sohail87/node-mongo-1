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

app.get('/api/contacts/:id',(request,response)=>{
  const requestId = request.params.id;
  let contact = contacts.filter(contact => {
    return contact.id == requestId;
  })

  if(!contact){
    response.status(404).json({message: 'no contact found'})
  }

  response.json(contact[0]);
})

app.post('/api/contacts',(request,response)=>{
  const payload = request.body
  const contact = {
    id: contacts.length + 1,
    first_name: payload.first_name,
    last_name: payload.last_name,
    email: payload.email,
    website: payload.website
  }
  contacts.push(contact);

  response.json(contact);
})







const hostname = 'localhost'
const port = 3001;

app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});
