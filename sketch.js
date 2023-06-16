let leftShip;
let rightShip;
let allDebris = [];

let leftScore;
let rightScore;

let spaceshipImage; 
let ufoImage; 

let gameEnded = false; // variable for gameEnded; always false until used

const NUM_DEBRIS = 50; // how hard do you want to make it?

// starfield variables
var stars = [];
var speed;

// sound 
let song;
let slider;
let button; 

function preload() {
  song = loadSound("punky.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  smooth(); // antialias drawing lines

//song
  button = createButton("play"); // make a button
  button.mousePressed(togglePlaying); 
  slider = createSlider (0,1,0.5,0.01); //range 0,1; start at 0.5 and increment at 0.01
  song.play(); 


  //starfield loop / creation of new stars
  for (var i = 0; i < 800; i++) {
    stars[i] = new Star();
  }

  // get the spaceship image from your project-folder
  spaceshipImage = loadImage("spaceship.png");
  ufoImage = loadImage("ufo.png");

  // load sound froms ound folder
  gamepoint = loadSound("gamepoint.mp3");
  death = loadSound("alert2.mp3");
  restart = loadSound("ascend1.mp3");
  win = loadSound("alert1.mp3");

  // creating ships
  leftShip = new Ship(windowWidth * 0.33, ufoImage); // start pos of ships 
  rightShip = new Ship(windowWidth * 0.66, ufoImage);

  // create the debris objects
  for (let i = 0; i < NUM_DEBRIS; i++) {
    allDebris.push(new Debris());
  }
  // creating the score objects
  leftScore = new Score(windowWidth * 0.33 - 40);
  rightScore = new Score(windowWidth * 0.66 + 40);
}

function togglePlaying() {
  if (!song.isPlaying()) { //only if song is not playing... do these actions
    song.play(); // play the song
    button.html ("pause"); // when playing want button to say pause and keeps at 
  } else{
    song.pause(); 
    button.html ("play") // when not playing want button to say play
  }
}

function draw() {
  background(0);
  // song.setVolume(slider.value()); // set value of slider to value of song volume 

  if (leftShip.checkScore() || rightShip.checkScore()) {
    showWinner();
    gameEnded = true;
  } else {
    playGame();
  }
}

function showWinner() {
  speed = map(70, 0, width, 0, 50);
  background(0);
  translate(width / 2, height / 2);
  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
  fill("white");
  textSize(60);
  stroke(3);
  text("You won!", windowWidth /2, windowWidth / 2);
  //win.play();
  // textSize(10)
  // text("cue: fireworks", windowWidth/2, 450);
}

function playGame() {
  leftShip.update();
  rightShip.update();

  leftShip.display();
  rightShip.display();

  // keep checking for collisions
  updateDebrisAndCheckCollisions();

  // pass in the players current score
  leftScore.display(leftShip.score);
  rightScore.display(rightShip.score);
}

// keep checking for collisions
function updateDebrisAndCheckCollisions() {
  for (let i = 0; i < allDebris.length; i++) {
    allDebris[i].update();
    allDebris[i].display();

    if (allDebris[i].hasHitShip(leftShip)) {
      leftShip.respawn();
      death.play();
    } else if (allDebris[i].hasHitShip(rightShip)) {
      rightShip.respawn();
      death.play();
    }
  }
}

// ---------------- CONTROLLER ---------------------

// PERSON RIGHT = UP AND DOWN ARROWS
function keyPressed() {
  // WHEN BUTTONS ARE PRESSED
  if (keyCode == UP_ARROW) {
    rightShip.isUp = true;
    rightShip.isDown = false;
    rightShip.isLeft = false;
    rightShip.isRight = false;
  } else if (keyCode == DOWN_ARROW) {
    rightShip.isDown = true;
    rightShip.isUp = false;
    rightShip.isLeft = false;
    rightShip.isRight = false;
  } else if (keyCode == RIGHT_ARROW) {
    rightShip.isRight = true;
    rightShip.isDown = false;
    rightShip.isUp = false;
    rightShip.isLeft = false;
  } else if (keyCode == LEFT_ARROW) {
    rightShip.isLeft = true;
    rightShip.isDown = false;
    rightShip.isUp = false;
    rightShip.isRight = false;
  }

  // PERSON LEFT = S = DOWN // W = UP
  if (keyCode == 87) {
    // keycode is 'w'
    leftShip.isUp = true;
    leftShip.isDown = false;
    leftShip.isLeft = false;
    leftShip.isRight = false;
  } else if (keyCode == 83) {
    // keycode is 's'
    leftShip.isDown = true;
    leftShip.isUp = false;
    leftShip.isLeft = false;
    leftShip.isRight = false;
  } else if (keyCode == 65) {
    // keycode is 'a'
    leftShip.isLeft = true;
    leftShip.isDown = false;
    leftShip.isUp = false;
    leftShip.isRight = false;
  } else if (keyCode == 68) {
    // keycode is 'd'
    leftShip.isRight = true;
    leftShip.isDown = false;
    leftShip.isUp = false;
    leftShip.isLeft = false;
  }
}

// WHEN BUTTUNS ARE RELEASED
function keyReleased() {
  if (keyCode == UP_ARROW) {
    rightShip.isUp = false;
  } else if (keyCode == DOWN_ARROW) {
    rightShip.isDown = false;
  } else if (keyCode == RIGHT_ARROW) {
    rightShip.isRight = false;
  } else if (keyCode == LEFT_ARROW) {
    rightShip.isLeft = false;
  }

  if (keyCode == 87) {
    leftShip.isUp = false;
  } else if (keyCode == 83) {
    leftShip.isDown = false;
  } else if (keyCode == 65) {
    leftShip.isDown = false;
  } else if (keyCode == 68) {
    leftShip.isDown = false;
  }
}

function mousePressed() {
  if (gameEnded === true) {
    leftShip.score = 0;
    rightShip.score = 0;
    restart.play();
    gameEnded = false;
  }
}
