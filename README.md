# OhMySentence API  
Version 0.0.1  
https://ohmysentence.onrender.com  

### Availble endpoints

#### 1 - GET /api/word-list/:type  
type should be any of the following:  
Noun, Verb, Adjective, Adverb, Pronoun, Preposition, Conjunction, Determine and Exclamation.  

#### 2 - POST /api/add-word  
POST Body :` { type, word} `

#### 3 - POST /api/submit-sentence  
POST Body :` { sentence } `  

### Run Locally  
To run locally you will need to have Node js installed,  
if you do not already have Node Js you can download it here:  
https://nodejs.org/en

#### Clone repository  
` git clone https://github.com/thomasdreyer/ohmysentence_api.git`  

#### Change into folder :   
` cd ohmysentence_api `  

#### Install dependencies :  
` npm install ` or ` yarn install `  

#### Run on your localhost at port 3001 :     
` npm start ` or ` yarn sart `  

#### Run tests :  
` npm test ` or ` yarn test `  

