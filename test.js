const chai = require('chai');
const request = require('supertest');
const app = require('./server'); // Adjust if your main app file is named differently

// test.test.js
const expect = chai.expect;

describe('Todo API Tests', () => {
	let createdTodoId;
	
	before((done) => {
		console.log('Starting API tests');
		done();
	});

	after((done) => {
		console.log('All API tests completed');
		done();
	});

	describe('GET /api/todos', () => {
		it('should return all todos', (done) => {
			request(app)
				.get('/api/todos')
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).to.be.an('array');
					done();
				});
		});
	});

	describe('POST /api/todos', () => {
		it('should create a new todo', (done) => {
			const newTodo = {
				text: 'Test todo item',
				completed: false
			};

			request(app)
				.post('/api/todos')
				.send(newTodo)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).to.be.an('object');
					expect(res.body.text).to.equal(newTodo.text);
					expect(res.body.completed).to.equal(newTodo.completed);
					expect(res.body).to.have.property('_id');
					createdTodoId = res.body._id;
					done();
				});
		});
	});

	describe('GET /api/todos/:id', () => {
		it('should return a specific todo', (done) => {
			// Skip this test if we don't have a created todo
			if (!createdTodoId) {
				return done();
			}

			request(app)
				.get(`/api/todos/${createdTodoId}`)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('_id');
					expect(res.body._id).to.equal(createdTodoId);
					done();
				});
		});

		it('should return 404 for non-existent todo', (done) => {
			request(app)
				.get('/api/todos/nonexistentid')
				.expect(404)
				.end((err) => {
					if (err) return done(err);
					done();
				});
		});
	});

	describe('PUT /api/todos/:id', () => {
		it('should update a specific todo', (done) => {
			// Skip this test if we don't have a created todo
			if (!createdTodoId) {
				return done();
			}

			const updatedTodo = {
				text: 'Updated test todo',
				completed: true
			};

			request(app)
				.put(`/api/todos/${createdTodoId}`)
				.send(updatedTodo)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).to.be.an('object');
					expect(res.body.text).to.equal(updatedTodo.text);
					expect(res.body.completed).to.equal(updatedTodo.completed);
					done();
				});
		});
	});

	describe('DELETE /api/todos/:id', () => {
		it('should delete a specific todo', (done) => {
			// Skip this test if we don't have a created todo
			if (!createdTodoId) {
				return done();
			}

			request(app)
				.delete(`/api/todos/${createdTodoId}`)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.include('deleted');
					done();
				});
		});
	});
});