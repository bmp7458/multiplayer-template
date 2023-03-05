//initialize socket.io
var socket = io();

//initialize canvas
var canvas = document.getElementById("game");
const ctx = canvas.getContext("2d")

//set canvas size
document.getElementById("game").width = document.documentElement.clientWidth;
document.getElementById("game").height = document.documentElement.clientHeight;
const image = document.getElementById("source");
//join the game
socket.emit('newPlayer');

function drawgun(scalex, scaley, x,y) {
  ctx.beginPath();
  ctx.rect(x,y,scalex,scaley);
  ctx.fill()
  ctx.stroke();
}

//Draw a player rectangle at x,y
function drawPlayer(player) {
  ctx.beginPath();
  ctx.arc(player.x, player.y, 16, 0*Math.PI, 2*Math.PI);
    ctx.fillStyle = "white"
  ctx.fill()
  //drawgun(30, 10, player.x + 10, player.y + 15)
  ctx.stroke();

}


//listen to the server and draw the players
var gamesate = null;
socket.on('state', (gameState) => {
  //update local gamestate
  gamesate = gameState;
  //clear the canvas
  ctx.clearRect(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight)
  //draw the players that the server sent
  for (let player in gameState.players) {
    
    drawPlayer(gameState.players[player])
  }
})

// /public/javascript.js