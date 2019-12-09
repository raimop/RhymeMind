const { returnRhyme, compareRhymes, returnWords } = require("./rhyming");
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get("/api/rhyme/:sentence", (req, res) => {
    return res.send(returnRhyme(req.params.sentence));
});

app.get("/api/rhymes/:sentence1&:sentence2", (req, res) => {
    return res.send(compareRhymes(req.params.sentence1, req.params.sentence2));
});

app.get("/api/words/:word", (req, res) => {
    return res.send(returnWords(req.params.word));
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server started at localhost:${PORT}` )
});