// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('FATAL ERROR: UNABLE TO CONNECT TO MONGODB SERVER');
  }
  
  console.log('--CONNECTED TO MONGODB SERVER--');

  // Insert new document into collection
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('FATAL ERROR: UNABLE TO INSERT NEW TODO: \n', err);
  //   }

  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });



  // Insert new doc into Users collection (name, age, location)
  // db.collection('Users').insertOne({
  //   name: 'Joe Burk',
  //   age: 36,
  //   location: 'Leary, TX'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('FATAL ERROR: COULD NOT CREATE NEW USER');
  //   }
  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  db.close();
});