const express=require('express'),cors=require('cors'),app=express();
app.use(cors());app.use(express.json());
let games={};
app.get('/start',(r,s)=>{const e=r.query.user;games[e]={board:Array(9).fill(''),currentPlayer:'X',status:'Your turn (X)'};s.json(games[e]);});
app.post('/move',(r,s)=>{const e=r.body.user,a=games[e];if(!a||a.board[r.body.position]||a.status!=`Your turn (${a.currentPlayer})`)return s.json({success:false,error:'Invalid move'});a.board[r.body.position]=a.currentPlayer;a.currentPlayer=a.currentPlayer==='X'?'O':'X';const o=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],t=a.currentPlayer==='X'?'O':'X',n=o.find(e=>e.every(r=>a.board[r]===t));n?a.status=`${t} WINS! 🎉`:!a.board.includes('')?a.status='Draw! 🤝':a.status=`Your turn (${a.currentPlayer})`;s.json({success:true,game:a});});
app.get('/health',(r,s)=>s.json({status:'TIC-TAC-TOE OK',port:3001}));
app.listen(3001,'0.0.0.0',()=>console.log('🎮 Tic-Tac-Toe:3001'));
