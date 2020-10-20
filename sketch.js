var PLAY = 1;
var END = 0;
var gameState = PLAY;

var girl, girlWalking;
var obstacle1, obstacle2, obstacle3, obstacle4;
var obstacle1Img, obstacle2Img, obstacle3Img, obstacle4Img;
var foodImg, campfireImg;
var wolf, wolfImg;
var bgMorning,bgNight;
var bg;
var count;
var obstaclesGroup
var score = 0;

function preload() {
  obstacle1Img=loadImage("../images/obstacle1.png");
  //obstacle2Img=loadImage("../images/obstacle2.");
  //obstacle3Img=loadImage("../images/obstacle3.");
  //obstacle4Img=loadImage("../images/obstacle4.");

  bgMorning=loadImage("../images/bg 1 forest.jpg");

  girlWalking=loadAnimation("../images/1 girl.png","../images/2 girl.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight);
   bg = createSprite(0,height/2,width,height);
  bg.addImage("morning",bgMorning);
  bg.scale = 8;
  bg.x=bg.width/2;
  bg.velocityX=-5;
  
  girl = createSprite(width/6, height/2+250, 50, 50);
  girl.addAnimation("girlWalking",girlWalking);
  
  tent = createSprite(width-200,height/2+250,50,50);
  tent.addImage("tent",tentImg);
  tent.visible= false;

  campfire = createSprite(600,200,50,50);
  campfire.addImage("camfire",campfireImg);
  campfire.visible= false;

  invisibleGround = createSprite(200,299,400,10);
  invisibleGround.visible = false;
  
  count = 0;
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  background(180);
  text("Score: "+ score, 500,150);
  
  if(gameState === PLAY)
   {
    score = score + Math.round(getFrameRate()/60);

    if(keyDown("space") && girl.y >= 159) 
    { 
     girl.velocityY = -14; 
    }
    
    girl.velocityY = girl.velocityY + 0.8

    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    girl.collide(invisibleGround);
    spawnObstacles();
     

    if(obstaclesGroup.isTouching(girl)){
      gameState = END;
      dieSound.play();
    }
  }
  else if(gameState === END){
    gameOver.visible = true;
    restart.visible = true;
    
   
    ground.velocityX = 0;
    girl.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  camera.position.x = displayWidth/2;
  camera.position.y = 350;
  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,285,10,40);
    obstacle.velocityX = -(6+3*score/100);
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
             
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;

  obstaclesGroup.destroyEach();

  ground.velocityX = -(6 + 3*score/100);
  
  score = 0;
  
}
