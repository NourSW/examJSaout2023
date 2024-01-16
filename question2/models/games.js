const path = require('node:path');

const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/questions.json');
const gamesJsonPath = path.join(__dirname, '../data/games.json');

function getRandomQuestions(level, count) {
  let pool = parse(jsonDbPath);
  if (level) {
    pool = pool.filter((q) => q.level === level);
  }
  const result = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * pool.length);
    result.push(pool[index]);
    pool.splice(index, 1); // Remove selected question from pool
  }
  return result;
}

function saveGameResult(username, score) {
  const gameResult = {
    username,
    score,
    timestamp: new Date(),
  };
  const games = parse(gamesJsonPath);
  games.push(gameResult);
  serialize(gamesJsonPath, games);
  return gameResult;
}

module.exports = {
  getRandomQuestions,
  saveGameResult,
};
