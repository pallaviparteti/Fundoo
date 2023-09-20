import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

let token;
describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('POST /user registration', () => {
    it('should able to create user when user data is given', (done) => {
      const user = {
        firstName: 'Aaptarish',
        lastName: 'Prasad',
        email: 'krishnaa@gmail.com',
        password: 'Harry@12345',
        city: 'amaravati'
      };
      request(app)
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          expect(res.body.data).to.be.an('object');

          done();
        });
    });
    it('should not able to register when user entered invalid data', (done) => {
      const user = {
        firstName: 'Aaptarish',
        lastName: 'Prasad',
        email: 'krishnaa01gma.net',
        password: 'Harry@12345'
      };

      request(app)
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });
  describe('POST/user login', () => {
    it('sould not able to logged in when user entered invalid credentials', (done) => {
      const user = {
        email: 'pallavi@gmail.com',
        password: 'pallavi@123'
      };
      request(app)
        .post('/api/v1/users/login')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
        });
      done();
    });

    it('should able to logged in with valid credentials', (done) => {
      const user = {
        email: 'krishnaa@gmail.com',
        password: 'Harry@12345'
      };
      request(app)
        .post('/api/v1/users/login')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          token = res.body.data;
          done();
        });
    });
  });

  describe('POST/create notes', () => {
    it('able to create the notes with fields title and description', (done) => {
      const note = {
        title: 'wheather',
        description:
          'somewhat cloudy and rainy as well,but here is lot much humidity'
      };

      request(app)
        .post('/api/v1/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(note)
        .end((err, res) => {
          console.log(res);
          expect(res.statusCode).to.be.equal(201);
        });
      done();
    });
    it('should not create a note with an empty title', (done) => {
      const data = {
        title: '',
        description:
          'somewhat cloudy and rainy as well,but her is lot much humidity'
      };

      request(app)
        .post('/api/v1/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });
});
