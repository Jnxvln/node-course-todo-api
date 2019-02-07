require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

const { mongoose } = require('./db/mongoose');
const { User } = require('./models/User');
const { Todo } = require('./models/Todo');
const { authenticate } = require('./middleware/authenticate');

let app = express();
const PORT = process.env.PORT;

// Middleware
app.use(bodyParser.json());

// Handle Routes
app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    return res.status(200).send(doc);
  }, (err) => {
    return res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    return res.status(400).send(err);
  });
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  // Check for valid id format first
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // If valid id, query DB for todo and return or return 404
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    return res.status(200).send({todo});
  }, (err) => {
    return res.status(404).send(`ERROR: No todo found with the id: ${id}.\n`, err);
  }).catch((err) => {
    // Catch and return any other errors
    return res.status(400).send(err);
  });
});

app.delete('/todos/:id', (req, res) => {
  // get the id
  let id = req.params.id;

  // validate the id (not valid, return 404)
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  // remove todo by id
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send('ERROR: No todo found by this ID.');
    }
    // Return the deleted todo object
    return res.send({todo});
  }, (err) => {
    if (err) {
      // Return any errors
      return res.status(400).send();
    }
  });
});

app.patch('/todos/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((err) => {
    res.status(400).send();
  });
});

// WARNING - DELETE THIS ROUTE (TESTING PURPOSE ONLY)
app.get('/users', (req, res) => {
  User.find().then((users) => {
    return res.status(200).send({users});
  }, (err) => {
    return res.status(404).send(err);
  })
})

// POST /users
app.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  let user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// LISTEN
app.listen(PORT, () => {
  console.log(`--SERVER RUNNING ON PORT ${PORT}--`);
});

module.exports = { app };