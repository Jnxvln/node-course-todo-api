// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('FATAL ERROR: UNABLE TO CONNECT TO MONGODB SERVER');
  }
  console.log('--CONNECTED TO MONGODB SERVER--');

  // Access the collection
  // db.collection('Todos').find({
  //   _id: new ObjectID('5c58a6e6cf5ee77c44152a19')
  // }).toArray().then((docs) => {
  //   console.log('Todos: ');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch Todos: \n', err);
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos Count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to count Todos: \n', err);
  // });

  db.collection('Users').find({name:'Joe'}).toArray().then((users) => {
    console.log(JSON.stringify(users, undefined, 2));
  }, (err) => {
    console.log('Unable to find users with the name "Joe"!');
  });

  // Close DB
  // db.close();
});