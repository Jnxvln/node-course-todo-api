const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { User } = require('./models/User');
const { Todo } = require('./models/Todo');

let app = express();

// Middleware
app.use(bodyParser.json());

// Handle Routes
app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.status(200).send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});


// LISTEN
app.listen(3000, () => {
  console.log('--SERVER RUNNING ON PORT 3000--');
});

module.exports = { app };