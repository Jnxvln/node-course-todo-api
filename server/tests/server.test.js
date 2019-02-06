const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Todo } = require('../models/Todo');


// Create array of 'dummy' todos
const todos = [
  { text: 'First test todo' },
  { text: 'Second test todo' }
];

// Clear the database before each test
beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
})

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    let text = 'Test todo text'

  request(app)
    .post('/todos')
    .send({ text })
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((err) => done(err));
    });
  });

  it('should not create todo with invalid body data', (done) => {
    // make a post request to same url
    request(app)
      .post('/todos')
      .send({})          // send 'send' as an empty object (should fail)
      .expect(400)       // expect we get 400 (don't make assertions about body)
      .end((err, res) => { 
        if (err) {
          return done(err);   // check errors on .end()
        }
        // assert length of todos IS 0 (since it failed)
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2); 
          done();
        }).catch((err) => done(err));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});