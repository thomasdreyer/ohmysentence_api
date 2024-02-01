
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });


const wordSchema = new mongoose.Schema({
    word: String,
    type: String
  });
  
  const Word = mongoose.model('Word', wordSchema);

  const sentenceSchema = new mongoose.Schema({
    sentence: String
  });
  
  const Sentence = mongoose.model('Sentence', sentenceSchema);

// Application routes :
// GET /api/word-list/:type
  app.get('/api/word-list/:type', (req, res) => {
    const { type } = req.params;
    Word.find({ type })
      .then(words => res.json({ words }))
      .catch(err => res.status(404).json({ error: err.message }));
  });

// POST /api/add-word
  app.post('/api/add-word', (req, res) => {
    const { word, type } = req.body;
    if (word && type) {
      const newWord = new Word({ word, type });
      newWord.save()
        .then(() => res.json({ message: 'Word added successfully' }))
        .catch(err => res.status(400).json({ error: err.message }));
    } else {
      res.status(400).json({ error: 'Invalid word or type' });
    }
  });


  // POST /api/submit-sentence
  app.post('/api/submit-sentence', (req, res) => {
    const { sentence } = req.body;
    if (sentence) {
      const newSentence = new Sentence({ sentence });
      newSentence.save()
        .then(() => res.json({ message: 'Sentence added successfully' }))
        .catch(err => res.status(400).json({ error: err.message }));
    } else {
      res.status(400).json({ error: 'Invalid sentence' });
    }
  });

app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
