class Ship {

  constructor(x, spaceshipImage) {
    this.x = x;
    this.score = 0;
    this.respawn();
    this.r = 10;
    // this.displayRight();
    // this.displayLeft();
    // store the image in the ship object
    this.spaceshipImage = spaceshipImage;
    this.ufoImage = ufoImage; 
  }

  respawn() {
    this.y = windowHeight - 20;
    this.isUp = false
    this.isDown = false;
    this.isRight = false;
    this.isLeft = false;
  }
 
  update() {
    if (this.isUp && this.y > 0) {
      this.up();
    } else if (this.isDown && this.y < windowHeight - 20) {
      this.down();
    }else if (this.isRight && this.x > 0) {
      this.right();
    } else if (this.isLeft && this.x < windowWidth -20 ){
      this.left();
    }
  
    
    if (this.hasPlayerScoredAPoint()) {
      this.score ++;
      gamepoint.play();
      this.respawn();
    }
  }
  
display() {
    imageMode(CENTER);
    image(this.ufoImage,this.x, this.y, this.r*9, this.r*9);
    image(this.spaceshipImage, this.x, this.y, this.r*3, this.r*3);
  } 
  
  up() {
   this.y-=3;
  }
  
  down() {
   this.y+=3;
  }
  
  right(){
    this.x+=3;
  }
  
  left(){
    this.x-=3;
  }
  
  hasPlayerScoredAPoint() {
    if (this.y <= 0) {
      return true;
    }
    return false;
  }
  checkScore(){
    if(this.score === 3 ){
      return true;
    }else{
      return false;
    }
  } 
}