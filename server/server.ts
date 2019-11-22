import { Request, Response } from 'express';
const { returnRhyme, compareRhymes } = require("./rhyming");
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get("/api/rhyme/:sentence", (req: Request, res: Response): Response => {
    return res.send(returnRhyme(req.params.sentence));
});

app.get("/api/rhymes/:sentence1&:sentence2", (req: Request, res: Response): Response => {
    return res.send(compareRhymes(req.params.sentence1, req.params.sentence2));
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server started at localhost:${PORT}` )
});