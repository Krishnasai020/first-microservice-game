const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let games = {};

app.get('/start', (req, res) => {
    const { user } = req.query;
    const secret = Math.floor(Math.random() * 100) + 1;
    games[user] = { secretNumber: secret, attempts: 0, maxAttempts: 7, status: 'Guess 1-100!' };
    res.json(games[user]);
});

app.post('/guess', (req, res) => {
    const { user, guess } = req.body;
    const game = games[user];
    game.attempts++;
    if (guess === game.secretNumber) {
        game.status = `🎉 Correct! ${game.secretNumber} in ${game.attempts} tries!`;
    } else if (game.attempts >= game.maxAttempts) {
        game.status = `Game Over! Secret: ${game.secretNumber}`;
    } else {
        game.status = guess < game.secretNumber ? `Too low! (${game.attempts}/7)` : `Too high! (${game.attempts}/7)`;
    }
    res.json({ success: true, game });
});

app.get('/health', (req, res) => res.json({ status: 'NUMBER GUESS OK', port: 3002 }));

app.listen(3002, '0.0.0.0', () => console.log('🎯 Number Guess: 3002'));
