const express = require('express');
const { getRandomQuestions, saveGameResult } = require('../models/games');

const router = express.Router();

router.get('/start', (req, res) => {
  const { level } = req.query;
  const questions = getRandomQuestions(level, 3);
  if (!questions) {
    res.status(400).send({ error: 'Invalid level parameter' });
  } else {
    res.send(questions);
  }
});

router.post('/', (req, res) => {
  const { username, score } = req.body;
  if (score < 0 || score > 3) {
    res.status(400).send({ error: 'Invalid score' });
  } else {
    const gameResult = saveGameResult(username, score);
    res.send(gameResult);
  }
});
module.exports = router;
