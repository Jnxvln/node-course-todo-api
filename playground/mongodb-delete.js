// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('FATAL ERROR: UNABLE TO CONNECT TO MONGODB SERVER');
  }
  console.log('--CONNECTED TO MONGODB SERVER--');

  // deleteMany
  db.collection('Users').deleteMany({name: 'Joe'}).then((result) => {
    console.log(result);
  }, (err) => {
    console.log('ERROR: Could not delete "Joe"s');
  });
  // deleteOne
  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5c58a2aeeafb83b6c5a2ccae')
  }).then((result) => {
    console.log(`Deleted user ${result.name} with ID ${result._id}`);
  }, (err) => {
    console.log('ERROR: Could not delete user with ID of 5c58a2aeeafb83b6c5a2ccae');
  })
  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // })
  // db.close();
});