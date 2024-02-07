import app from '../index.js';
import supertest from 'supertest';
import { expect } from 'chai';
import addContext from 'mochawesome/addContext.js';
import util from 'util';


 // Test GET /api/word-list/:type
 describe('GET /api/word-types', () => {
  it('should return an array of valid word types', async () => {
   const res = await supertest('http://localhost:3001')
      .get('/api/word-types')
      .then(res => res);
    expect(res.statusCode).to.be.equal(200);
    expect(res.body).to.be.an('array');
  }).timeout(60000);
});

   // Test GET /api/word-list/:type
describe('GET /api/word-list/:type', () => {
  it('should return an array of words for a valid type', async () => {
   const res = await supertest('http://localhost:3001')
      .get('/api/word-list/Noun')
      .then(res => res);
    expect(res.statusCode).to.be.equal(200);
    expect(res.body).to.be.an('array');
  }).timeout(60000);
});

// Test POST /api/add-word
describe('POST /api/add-word', () => {
  it('should add a new word successfully', async () => {
    const newWord = { word: 'newWord', type: 'Noun' };
   const res = await supertest('http://localhost:3001')
      .post('/api/add-word')
      .send(newWord)
      expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Word added successfully');
  });

  it('should return an error for invalid data', async () => {
    const invalidWord = { word: '', type: 'noun' };
    const res = await supertest('http://localhost:3001')
      .post('/api/add-word')
      .send(invalidWord)
        expect(res.statusCode).to.be.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.a('string');
  });
});

// Test POST /api/submit-sentence
describe('POST /api/submit-sentence', () => {
  it('should add a new sentence successfully', async () => {
    const newSentence = { sentence: 'This is a new sentence.' };
    const res = await supertest('http://localhost:3001')
      .post('/api/submit-sentence')
      .send(newSentence)
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Sentence added successfully');
  });

  it('should return an error for invalid sentence', async () => {
    const invalidSentence = { sentence: '' };
    const res = await supertest('http://localhost:3001')
      .post('/api/submit-sentence')
      .send(invalidSentence)
        expect(res.statusCode).to.be.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.a('string');
  });
});
