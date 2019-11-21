import { returnRhyme, compareRhymes } from "./rhyming";
const express = require('express');
import { Request, Response } from 'express';
const app = express();
const PORT = process.env.PORT || 8080;

app.get("/api/rhyme/:word", (req: Request, res: Response): Response => {
    console.log(req.body);
    return res.send(returnRhyme(req.params.word));
});

app.get("/api/rhymes/:word1&:word2", (req: Request, res: Response): Response => {
    return res.send(compareRhymes(req.params.word1, req.params.word2));
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server started at localhost:${PORT}` )
});