// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('FATAL ERROR: UNABLE TO CONNECT TO MONGODB SERVER');
  }
  console.log('--CONNECTED TO MONGODB SERVER--');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5c58b452cf5ee77c44152cb1')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('ERROR UPDATED TODO: \n', err);
  // })

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5c58a34923d149b6c7c70633')
  }, {
    $set: {
      name: 'Justin',
      age: 30,
      location: 'Texarkana, TX'
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  }, (err) => {
    console.log('ERROR UPDATING ObjectID 5c58a34923d149b6c7c70633!');
  });

  // db.close();
});