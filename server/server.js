const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

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

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  // Check for valid id format first
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  // If valid id, query DB for todo and return or return 404
  Todo.findById(id).then((todo) => {
    if (!todo) {
      res.status(404).send();
    }
    res.status(200).send({todo});
  }, (err) => {
    res.status(404).send(`ERROR: No todo found with the id: ${id}.\n`, err);
  }).catch((err) => {
    // Catch and return any other errors
    res.status(400).send(err);
  });
});

// LISTEN
app.listen(3000, () => {
  console.log('--SERVER RUNNING ON PORT 3000--');
});

module.exports = { app };