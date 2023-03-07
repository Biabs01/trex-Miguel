var JOGAR = 1;
var FIM = 0;
var estadoDeJogo = JOGAR;

var trex ,trex_correndo;
var chao, chao_img, chao_invisivel;

var nuvem, nuvem_img, nuvem_grupo;
var obstaculo, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6, obstaculo_grupo;

var pontos;

function preload(){
  trex_correndo = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  
  chao_img = loadImage("ground2.png");
  
  nuvem_img = loadImage("cloud.png");
  
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
}

function setup(){
  createCanvas(600,200);
  
  //crie um sprite de trex
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("correndo", trex_correndo);
  trex.scale = 0.5;

  chao = createSprite(200, 180, 400, 20);
  chao.addImage("chao", chao_img);
  chao.x = chao.width / 2;
  chao.velocityX = -4;

  chao_invisivel = createSprite(200, 190, 400, 10);
  chao_invisivel.visible = false;

  pontos = 0;

  nuvem_grupo = new Group();
  obstaculo_grupo = new Group();
}

function draw(){
  background("white");
  text("Pontuação: " + pontos, 500, 50);
  
  if(estadoDeJogo === JOGAR){
    chao.velocityX = -4;
    pontos = pontos + Math.round(frameCount/60);
    if(keyDown("space") && trex.y >= 150){
      trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 0.5;
    if(chao.x < 0 ){
      chao.x = chao.width/2;
    }
    criarNuvens();
    criarObstaculo();

  }
  else if( estadoDeJogo === FIM){
    chao.velocityX = 0;

  }
  
  trex.collide(chao_invisivel);
  drawSprites();
}

function criarNuvens(){
  if (frameCount % 60 === 0){
    nuvem = createSprite(600, 100, 40, 10);
    nuvem.addImage(nuvem_img);
    nuvem.scale = 0.7;
    nuvem.y = Math.round(random(20, 100));
    nuvem.velocityX = -4;

    nuvem.lifetime = 180;

    nuvem.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
}

function criarObstaculo(){
  if(frameCount % 60 === 0){
    obstaculo = createSprite(650, 165, 10, 40);
    obstaculo.velocityX = -4;

    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstaculo.addImage(obstaculo1);
      break;
      case 2: obstaculo.addImage(obstaculo2);
      break;
      case 3: obstaculo.addImage(obstaculo3);
      break;
      case 4: obstaculo.addImage(obstaculo4);
      break;
      case 5: obstaculo.addImage(obstaculo5);
      break;
      case 6: obstaculo.addImage(obstaculo6);
      break;
      default: break;
    }

    obstaculo.scale = 0.5;
    obstaculo.lifetime = 170;

  }
}