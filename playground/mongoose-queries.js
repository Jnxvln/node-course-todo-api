const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/Todo');
const { User } = require('../server/models/User');

// const id = '5c5a538083f437c6b7ff9e3211';

// if (!ObjectID.isValid(id)) {
//   console.log('ERROR: Id not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos: ', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo: ', todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('ERROR: Id not found');
//   }
//   console.log('Todo By ID: ', todo);
// }).catch((err) => {
//   console.log(err);
// });

/* CHALLENGE: Query users collection, use User.findById
   then handle 3 case (works but no user, user found (print), 
   then handle any errors) */

let userId = '5c5a3310ef232a3dc12db00c';
if (!ObjectID.isValid(userId)) {
  return console.log('ERROR: Invalid User ID');
}

User.findById(userId).then((user) => {
  if (!user) {
    return console.log('ERROR: No user was found');
  }

  console.log('User: ');
  console.log(JSON.stringify(user, undefined, 2));
}).catch((err) => {
  console.log('ERROR: ', err);
});