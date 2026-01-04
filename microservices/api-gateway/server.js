const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// TIC-TAC-TOE - EXACT MATCH
app.get('/api/games/tic-tac-toe/start', async (req, res) => {
  try {
    const ticRes = await fetch('http://tic-tac-toe:3001/start?' + new URLSearchParams(req.query));
    const data = await ticRes.json();
    res.json(data);
  } catch(e) {
    res.status(500).json({error: 'Tic service down', details: e.message});
  }
});

app.post('/api/games/tic-tac-toe/move', async (req, res) => {
  try {
    const ticRes = await fetch('http://tic-tac-toe:3001/move', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(req.body)
    });
    const data = await ticRes.json();
    res.json(data);
  } catch(e) {
    res.status(500).json({error: 'Tic move failed'});
  }
});

// NUMBER GUESS - EXACT MATCH  
app.get('/api/games/number-guess/start', async (req, res) => {
  try {
    const guessRes = await fetch('http://number-guess:3002/start?' + new URLSearchParams(req.query));
    const data = await guessRes.json();
    res.json(data);
  } catch(e) {
    res.status(500).json({error: 'Guess service down'});
  }
});

app.post('/api/games/number-guess/guess', async (req, res) => {
  try {
    const guessRes = await fetch('http://number-guess:3002/guess', {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(req.body)
    });
    const data = await guessRes.json();
    res.json(data);
  } catch(e) {
    res.status(500).json({error: 'Guess failed'});
  }
});

// SUDOKU - EXACT MATCH
app.get('/api/games/sudoku/start', async (req, res) => {
  try {
    const sudokuRes = await fetch('http://sudoku:3003/start?' + new URLSearchParams(req.query));
    const data = await sudokuRes.json();
    res.json(data);
  } catch(e) {
    res.status(500).json({error: 'Sudoku service down'});
  }
});

app.post('/api/games/sudoku/fill', async (req, res) => {
  try {
    const sudokuRes = await fetch('http://sudoku:3003/fill', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(req.body)
    });
    const data = await sudokuRes.json();
    res.json(data);
  } catch(e) {
    res.status(500).json({error: 'Sudoku failed'});
  }
});

// Frontend catch-all
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(3000, () => console.log('🚀 GATEWAY FIXED - All endpoints exact match'));
