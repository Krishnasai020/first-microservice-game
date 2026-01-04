const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let games = {};
const sudokuPuzzles = [
    [[5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],[8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],[0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]]
];

app.get('/start', (req, res) => {
    const { user } = req.query;
    const puzzle = sudokuPuzzles[0];
    games[user] = { board: puzzle.map(row => [...row]), original: puzzle.map(row => [...row]), status: 'Fill empty cells!' };
    res.json(games[user]);
});

app.post('/fill', (req, res) => {
    const { user, row, col, value } = req.body;
    const game = games[user];
    if (game.original[row][col] !== 0 || value < 1 || value > 9) {
        return res.json({ success: false, error: 'Invalid move' });
    }
    game.board[row][col] = value;
    game.status = `Placed ${value} at (${row+1},${col+1})`;
    res.json({ success: true, game });
});

app.get('/health', (req, res) => res.json({ status: 'SUDOKU OK', port: 3003 }));

app.listen(3003, '0.0.0.0', () => console.log('🔢 Sudoku: 3003'));
