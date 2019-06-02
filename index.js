var game_active = false;
var active_player = 0;
var gameboard = [];
var player_color = [];
player_color[1] = "red";
player_color[2] = "blue";
var countPlayer1=0;
var countPlayer2=0;
var playAgainst="";

function beginGame() {
  if (game_active == true) return false;
  game_active = true;
  // | 0,0 | 0,1 | 0,2 | 0,3 | 0,4 | 0,5 | 0,6 |
  // | 1,0 | 1,1 | 1,2 | 1,3 | 1,4 | 1,5 | 1,6 |
  // | 2,0 | 2,1 | 2,2 | 2,3 | 2,4 | 2,5 | 2,6 |
  // | 3,0 | 3,1 | 3,2 | 3,3 | 3,4 | 3,5 | 3,6 |
  // | 4,0 | 4,1 | 4,2 | 4,3 | 4,4 | 4,5 | 4,6 |
  // | 5,0 | 5,1 | 5,2 | 5,3 | 5,4 | 5,5 | 5,6 |

  for (row=0; row<=5; row++) {
    gameboard[row] = [];
    for (col=0; col<=6; col++) {
      gameboard[row][col] = 0;
    }
  }
  playAgainst=prompt("Do you want to play against the machine y/n?");

  drawBoard();
  active_player = 1;
  setUpTurn();
}

// drawBoard will draw the board - it will update each item to make sure it is the appropriate value //
function drawBoard() {
  checkForWin();
  for (col = 0; col<=6; col++) {
    for (row=0; row<=5; row++) {
      document.getElementById('square_'+row+'_'+col).innerHTML ="<span class='piece player"+gameboard[row][col]+"'> </span>";
    }
  }
}

function checkForWin() {

  //check left-to-right
  for (i=1; i<=2; i++) {
    //since a winning row must be 4 long, we only need to check the first 3 rows, 0,1,and 2
    for (col = 0; col <=3; col++) {
      for (row = 0; row <=5; row++) {
        //check to see if the gameboard item is set to the player we are checking, if so, lets check the next 3 for a match
        if (gameboard[row][col] == i) {
          if ((gameboard[row][col+1] == i) && (gameboard[row][col+2] == i) && (gameboard[row][col+3] == i)) {
            endGame(i);
            return true;
          }
        }
      }
    }
  }
  //check top-to-bottom
  for (i=1; i<=2; i++) {
    //since a winning row must be 4 long, we only need to check the first 3 rows, 0,1,and 2
    for (col = 0; col <=6; col++) {
      for (row = 0; row <=2; row++) {
        if (gameboard[row][col] == i) {
          if ((gameboard[row+1][col] == i) && (gameboard[row+2][col] == i) && (gameboard[row+3][col] == i)) {
            endGame(i);
            return true;
          }
        }
      }
    }
  }
  //check diagnol down
  for (i=1; i<=2; i++) {
    for (col = 0; col <=3; col++) {
      for (row = 0; row <=2; row++) {
        if (gameboard[row][col] == i) {
          if ((gameboard[row+1][col+1] == i) && (gameboard[row+2][col+2] == i) && (gameboard[row+3][col+3] == i)) {
            endGame(i);
            return true;
          }
        }
      }
    }
  }
  //check diagnol up
  for (i=1; i<=2; i++) {
    for (col = 0; col <=3; col++) {
      //we also only need to check the bottom most columns - as the win must be upwards
      for (row = 3; row <=5; row++) {
        //check to see if the gameboard item is set to the player we are checking, if so, lets check the next 3 for a match
        if (gameboard[row][col] == i) {
          if ((gameboard[row-1][col+1] == i) && (gameboard[row-2][col+2] == i) && (gameboard[row-3][col+3] == i)) {
            endGame(i);
            return true;
          }
        }
      }
    }
  }
}

function endGame(winningPlayer) {
  game_active = false; //set the "game_active" to false, so that it can be started again.
  document.getElementById('game_info').innerHTML = "Winner: " + winningPlayer; //set the "game_info" to the winner and the winning player #
}

function checkIfTie(){
  active_player==1? countPlayer1++ : countPlayer2++;
  if(countPlayer1>21){alert("IT IS A TIE")};
  return;
}

function setUpTurn() {
  if (game_active) {
    //display the current player, and create a <span> with the class of the player# so that it will show the color.
    document.getElementById('game_info').innerHTML = "Current Player: Player " + active_player + " <span class='player"+active_player+"'>(" + player_color[active_player] + ")</span>";
  }
  checkIfTie();
  if(playAgainst.toLowerCase()=="y"){
    active_player==2? drop(generateCol()):console.log("not playing against machine")
  }
}
function drop(col) {
    for (row=5; row>=0; row--) {
      if (gameboard[row][col] == 0) {
        gameboard[row][col] = active_player;
        drawBoard();
        active_player == 1? active_player = 2 : active_player = 1;
        
        setUpTurn();
        return true;
      }
    }
}

//random click on a column:
function generateCol(){
  var ranNum=Math.floor(Math.random()*8);
  return ranNum;
}

//insert text and insert UL using DOM
var h = document.createElement("h3");
var t = document.createTextNode("INSTRUCTIONS:");
h.appendChild(t);
document.body.appendChild(h);

const todoList=document.createElement("ul");
var y=["Run","Play","Reset"];
for(var z=0;z<y.length;z++){
  const newTodo=document.createElement("li");
  newTodo.textContent=`${y[z]}`;
  todoList.appendChild(newTodo);
}
document.body.appendChild(todoList);

// code for slider:
var slider=document.getElementById("slider");
slider.oninput=function(){
  console.log(slider.value);
  var reset=slider.value;
  if(reset==0 || reset ==100){
    location.reload();
  }
}
