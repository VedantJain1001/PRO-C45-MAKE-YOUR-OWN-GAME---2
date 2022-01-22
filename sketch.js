var earth, earthImg;
var spaceImg, gameOverImg, youWinImg;

var asteroid1, asteroid1Img;
var asteroid2, asteroid2Img;
var asteroid3, asteroid3Img;
var asteroid4, asteroid4Img;
var asteroids1Grp, asteroids2Grp;

var astronaut, astronautImg1;
var astronautGrp;

var player, playerImg;

var missile, missileImg;
var missileGrp;

var points = 0;
var lifes = 3;

var life;
var life3, life2, life1;

var START_SCREEN = 2;
var PLAY = 1;
var END = 0;
var WIN = -1;
var gameState = 2;

function preload (){ 
  spaceImg = loadImage("Space.png");
  earthImg = loadImage("Earth.png");
  gameOverImg = loadImage("Game Over.png");
  youWinImg = loadImage("You Win.png");

  asteroid1Img = loadImage("Asteroid 1.png");
  asteroid2Img = loadImage("Asteroid 2.png");
  asteroid3Img = loadImage("Asteroid 3.png");
  asteroid4Img = loadImage("Asteroid 4.png");

  astronautImg1 = loadImage("astronaut.png");

  playerImg = loadImage("player.png");

  missileImg = loadImage("Missile.png");

  life3 = loadImage("Lifes3.png");
  life2 = loadImage("Lifes2.png");
  life1 = loadImage("Lifes1.png");
}

function setup (){
  createCanvas(1600,700);
  
  life = createSprite(860,40,200,50);
  life.scale = 0.6;

  earth = createSprite(1400,200,20,200);
  earth.addImage(earthImg);
  earth.scale = 0.9;

  player = createSprite(1100,180,20,200);
  player.addImage(playerImg);
  player.scale = 0.5; 

  asteroids1Grp = createGroup();
  asteroids2Grp = createGroup(); 
  astronautGrp = createGroup();
  missileGrp = createGroup();
}

function draw (){
  background(spaceImg); 
  
  missile = createSprite(1100,-40,50,50);  

  if(gameState === START_SCREEN){
    if(keyDown("P")){
      gameState = 1;
    }

    life.visible = false;

    fill("WHITE");
    stroke("BLACK");
    strokeWeight("10");
    textSize(40);
    textFont("Segoe Script");
    text("|| Press 'P' to start the game ||",300, 250);
    text("Press 'Left arrow' key to shoot missiles to stop the asteroids", 50, 350);
    text("Save the astronauts with the help of your spaceship to gain a point", 50, 450);
    text("Do NOT let the astronauts crash on Earth or you lose a point", 100, 550);
  }

  if(gameState === PLAY){
    asteroids1();
    asteroids2();
    createAstronaut();    
    console.log(lifes);
    life.visible = true;

    player.y = mouseY;

    if (asteroids1Grp.collide(player)){
      asteroids1Grp.destroyEach();
      lifes = lifes - 1;
    }
    if (asteroids2Grp.collide(player)){
      asteroids2Grp.destroyEach();
      lifes = lifes - 1;
    }    

    if(asteroids1Grp.collide(missileGrp)){
      asteroids1Grp.destroyEach();
      missile.lifetime = 0;
    }

    if(asteroids2Grp.collide(missileGrp)){
      asteroids2Grp.destroyEach();
      missile.lifetime = 0;
    }

    if(astronautGrp.collide(player)){
      astronautGrp.destroyEach();
      points = points + 1;
    }

    if(astronautGrp.collide(missile)){
      astronautGrp.destroyEach();
      points = points - 1;
    }

    if(astronautGrp.collide(earth)){
      astronautGrp.destroyEach();
      points = points - 1;
    }

    if(earth.collide(asteroids1Grp)){
      gameState = END;
    }
    if(earth.collide(asteroids2Grp)){
      gameState = END;
    }

    if(keyDown(37)){
      createMissile();
    }

    fill("WHITE");
    stroke("BLACK");
    strokeWeight("10");
    textSize(40);
    textFont("Segoe Script");
    text(points, 1400, 40);
    text("Score: ", 1200, 40)

    if(lifes === 0){
      gameState = END;
    }

    if(points === 10){
      gameState = WIN;
    }

    if(lifes === 3){
      life.addImage("life", life3);
    }

    if(lifes === 2){
      life.addImage("life", life2);
    }

    if(lifes === 1){
      life.addImage("life", life1);
    }
  }

  if(gameState === END){
    earth.destroy();
    player.destroy();
    life.destroy();
    asteroids1Grp.destroyEach(); 
    asteroids2Grp.destroyEach();  
    asteroids1Grp.setVelocityXEach(0);  
    asteroids2Grp.setVelocityXEach(0);
    missileGrp.destroyEach();
    astronautGrp.destroyEach();
    background(gameOverImg);
  }

  if(gameState === WIN){
    earth.destroy();
    player.destroy();
    life.destroy();
    asteroids1Grp.destroyEach(); 
    asteroids2Grp.destroyEach();  
    asteroids1Grp.setVelocityXEach(0);  
    asteroids2Grp.setVelocityXEach(0);
    missileGrp.destroyEach();
    astronautGrp.destroyEach();
    background(youWinImg);
  }

  drawSprites();
}

function asteroids1 (){
  if(World.frameCount % 130 === 0){
    asteroid1 = createSprite(-20,200,20,200);
    asteroid1.scale = 0.4;
    r = Math.round(random(1,2));
    if (r == 1){
      asteroid1.addImage(asteroid1Img);  
    } 
    else if (r == 2){
      asteroid1.addImage(asteroid2Img);  
    }
    asteroid1.y = Math.round(random(10,600));  
    asteroid1.velocityX = 9;
    asteroid1.lifetime  = 150;  
    asteroids1Grp.add(asteroid1);    
  }
}

function asteroids2 (){
  if(World.frameCount % 130 === 0){
    asteroid2 = createSprite(-20,500,20,200);
    asteroid2.scale = 0.5;
    r = Math.round(random(3,4));
    if (r == 3){
      asteroid2.addImage(asteroid3Img);  
    } 
    else if (r == 4){
      asteroid2.addImage(asteroid4Img);  
    }  
    asteroid2.y = Math.round(random(30,450));  
    asteroid2.velocityX = 10;
    asteroid2.lifetime  = 150;  
    asteroids2Grp.add(asteroid2);
  }
}

function createMissile(){
  //if(missile.X = player.X -100){
    missile.y = player.y+30;
    missile.addImage(missileImg);
    missile.scale = 0.3;
    missile.velocityX = -8;
    missile.lifetime = 150;
    missileGrp.add(missile);
  //}
}

function createAstronaut(){
  if(World.frameCount % 180 === 0){
    astronaut = createSprite(-20,500,20,200);
    astronaut.scale = 0.3;
    astronaut.addImage(astronautImg1); 
    astronaut.y = Math.round(random(30,670));  
    astronaut.velocityX = 10;
    astronaut.lifetime  = 200;  
    astronautGrp.add(astronaut);
  }  
}