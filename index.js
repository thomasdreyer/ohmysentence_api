import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors';
import { connect, Schema, model } from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

connect(process.env.MONGODB_URL);

const wordTypesSchema = new Schema({
wordTypes:Array
});

const WordTypes = model('WordTypes', wordTypesSchema)

const wordSchema = new Schema({
    word: String,
    type: String
  });
  
  const Word = model('Word', wordSchema);

  const sentenceSchema = new Schema({
    sentence: String
  });
  
  const Sentence = model('Sentence', sentenceSchema);

// Application routes :
// GET /api/word-types
app.get('/api/word-types', (req,res)=>{
WordTypes.find({})
.then(wordTypes => res.json(wordTypes))
.catch(err => res.status(404).json({ error: err.message }));
})


// GET /api/word-list/:type
  app.get('/api/word-list/:type', (req, res) => {
    const { type } = req.params;
    Word.find({ type })
      .then(words => res.json(words))
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

export default app;
