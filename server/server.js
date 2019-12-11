const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const { returnRhyme, compareRhymes, returnWords } = require("./rhyming");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/rhyme/:sentence", (req, res) => {
  return res.send(returnRhyme(req.params.sentence));
});

app.get("/api/rhymes/:sentence1&:sentence2", (req, res) => {
  return res.send(compareRhymes(req.params.sentence1, req.params.sentence2));
});

app.get("/api/words/:word", (req, res) => {
  return res.send(returnWords(req.params.word));
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));