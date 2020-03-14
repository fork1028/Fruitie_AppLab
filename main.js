// below are interactive page transitions
onEvent("startGame", "click", function(event) {
  console.log("startGame clicked!");
  setScreen("gamePage");
});
onEvent("backBtn", "click", function(event) {
  console.log("back clicked!");
  setScreen("home");
});
onEvent("howTo", "click", function(event) {
  console.log("howTo clicked!");
  setScreen("instructions");
});
onEvent("goback", "click", function(event) {
  console.log("backToHomePage clicked!");
  setScreen("home");
});

// initialize variables
var xPlayer = getXPosition("character");
var yPlayer = getYPosition("character");
var fruits = ["banana", "kiwi", "strawberry", "pineapple","goal"];
var tiles = ["tiles", "tiles_extend"];
var mountains = ["mountain"];
var trees = ["trees_upleft", "trees_bottomleft", "trees_bottomright"
, "flowers-1", "flowers-2", "flowers-3", "flowers-4", "flowers-5","trees_upright"];
var tilesSpeed = 7;
var treesSpeed = 6;
var fruitsSpped = 7;
var xMountains = 0;
var xTrees = 0;
var xTiles = 0;
var xFruits = 400;
var xFruits1 = getProperty("banana","x");
var xFruits2 = getProperty("kiwi","x");
var xFruits3 = getProperty("pineapple","x");
var xFruits4 = getProperty("strawberry","x");
var steps = 20;
var seconds = 0;
var index = 0;

// start the game if the start btn is clicked
onEvent("startBtn","click",function(){
  // hide the btn if it is clicked
  if(!getProperty("startBtn", "hidden")){
    moveBkgrd();
    setProperty("startBtn","hidden", true);
    console.log("starting game");
  }
})

// if space is pressed, the character jumps
onEvent("gamePage", "keypress", function() {
  steps = steps - 15;
  console.log("space is pressed");
});

// function to move tiles
function moveBkgrd(){
  timedLoop(50, function(){
    // initialize time
    seconds++;
    // reset y position
    setProperty("character", "y", 372);
    // adjust tiles x coordinate
    xTiles = (xTiles - tilesSpeed) + loopBkgrd(xTiles);
    moveOneTile(tiles, xTiles);
    
    // adjust tree x coordinate
    xTrees = (xTrees - treesSpeed) + loopBkgrd(xTrees);
    moveOneTree(trees, xTrees);
    
    // display fruits
    xFruits = (xFruits - fruitsSpped) + loopFruits(fruits);
    moveOneFruit(fruits, xFruits, index);
    
    
    // do jumps
    if (steps < 10){
      setProperty("character", "y", 330);
      steps++;
    }
    
    // displays game over when collide with fruits
    if(collideFruits(fruits)==true){
      gameOver();
      console.log("game over");
    }
    
    // if wins display winning message
    if(checkWin()==true){
      gameOver();
      setProperty("won","hidden",false);
      setProperty("goback","hidden",false);
    }
    
  })
}

// check if the game wins
function checkWin(){
  var isWon=false;
  xPos=getProperty("goal","x");
  if(xPos - xPlayer == 84){
    yPlayer=getProperty("character","y");
    yPos = getProperty("goal", "y");
    isWon=true;
  }
  return isWon;
}

// Checks if character avoid obstacles
function collideFruits(fruits){
  var collision = false;
  var yfruit = 0;
  fruitsX1=getProperty("banana","x");
  fruitsX2=getProperty("kiwi","x");
  fruitsX3=getProperty("strawberry","x");
  fruitsX4=getProperty("pineapple","x");
  // if absolute value distance less than 80/83
  if(fruitsX1 - xPlayer == 83||
  fruitsX2 - xPlayer == 80||
  fruitsX3 - xPlayer == 83||
  fruitsX4 - xPlayer == 80){
    yPlayer=getProperty("character","y");
    // if x is near collision, check player y
    yfruit1 = getProperty(fruits[0], "y");
    yfruit2 = getProperty(fruits[1], "y");
    yfruit3 = getProperty(fruits[2], "y");
    yfruit4 = getProperty(fruits[3], "y");
    // Check if player's y is within range
    if (Math.abs(yPlayer-yfruit1)==23
    ||Math.abs(yPlayer-yfruit2)==23
    ||Math.abs(yPlayer-yfruit3)==23
    ||Math.abs(yPlayer-yfruit4)==23){
        collision = true;
    }
  }
  return collision;
}

// game over
function gameOver(){
  timedLoop(15, function() {
    stopTimedLoop();
  });
}

// Moves fruits on the x-axis
function moveOneFruit(fruitArray, xLocation, index){
  setProperty(fruitArray[0],"x",xLocation);
  setProperty(fruitArray[1],"x",xLocation+400);
  setProperty(fruitArray[2],"x",xLocation+800);
  setProperty(fruitArray[3],"x",xLocation+1200);
  setProperty(fruitArray[4],"x",xLocation+1600);
}

// Moves tiles left on the x-axis
function moveOneTile(tileArray, xLocation) {
  setProperty(tileArray[0], "x", xLocation);
  setProperty(tileArray[1], "x", xLocation +300);
}

// Moves trees left on the x-axis
function moveOneTree(treeArray, xLocation) {
  setProperty(treeArray[0], "x", xLocation);
  setProperty(treeArray[1], "x", xLocation);
  setProperty(treeArray[2], "x", xLocation+300);
  setProperty(treeArray[8], "x", xLocation+300);
}

// loop bkgrd
function loopBkgrd(xObj){
  var changeX = 0;
  changeX=-0.2;
  if (xObj < -300) {
        changeX = - xObj;
    }
  return changeX;
}

// loop fruits
function loopFruits(array){
  var changeX = 0;
  changeX=-0.2;
  if (array[3] < 0) {
        changeX = array[3]+400;
    }
  return changeX;
}
