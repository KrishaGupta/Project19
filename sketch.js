var spaceship,spaceshipImg;
var space, spaceImg;
var rock, rockImg, rocksGroup;
var gameOver, gameOverImg, restart;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

function preload(){
 
    spaceshipImg = loadImage("spaceship2.png");
    spaceImg = loadImage("space1.png");
    rockImg = loadImage("rock1.png");
    gameOverImg = loadImage("gameover.png")

}

function setup() {
 createCanvas(400,300);

 space = createSprite(200,100,600,200);
 space.addImage("space",spaceImg);
 space.velocityX = -1;

 spaceship = createSprite(50,160,20,25);
 spaceship.addImage("spaceship", spaceshipImg);
 spaceship.scale = 0.2;

 gameOver = createSprite(200,150);
 gameOver.addImage("gameover",gameOverImg);
 gameOver.scale=0.1;
 gameOver.visible = false;

 rocksGroup = new Group();
}

function draw() {
    background(0);
 
if (gameState === PLAY) {
    if (keyDown("UP_ARROW")) {
        spaceship.y = spaceship.y - 2;
    }

    if (keyDown("DOWN_ARROW")) {
        spaceship.y = spaceship.y + 2;
    }

    if (space.x <150) {
        space.x = 200 
    }

    if (rocksGroup.isTouching(spaceship)) {
        gameState = END;
      
       
    }

  spawnRock();
 drawSprites();

} else if (gameState === END){

    gameOver.visible =true;
    rocksGroup.setLifetimeEach(0);
    rocksGroup.setVelocityXEach(0);

    
    if(keyDown("SPACE")) {
        reset();
      }

      textSize(20);
      fill(255);
      text("Press Space to Restart the game!", 50,150);
}

 
}

function spawnRock() {

    if (frameCount% 200 ===0 ) {
        rock = createSprite(350,200,30,20);
        rock.y = Math.round(random(10,290));
        rock.addImage("rock1", rockImg );
        rock.scale = 0.1;
        rock.velocityX= -1;
        rocksGroup.add(rock);

        
    }
}

function reset(){

    gameState = PLAY;
    gameOver.visible = false;
    rocksGroup.destroyEach();
    spaceship.y = 150;
}