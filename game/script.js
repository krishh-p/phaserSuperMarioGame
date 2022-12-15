  //game variables here (all global for now)

let name2=prompt("Enter your name") // name is global because the name will remain constant throughout the game

//game sprite variables
let bg; // there will be a background for each scene
let width; // the width of the game is constant throughout the game
let height; // the height of the game is constant throughout the game
let ground;
let player;

//the game controls will be accessed throughout the game
let up; 
let down;
let left;
let right;

let playerSpeed; // the player speed has to be accessed throughout the game
let score=0; // the score has to be accessible throughout the levels

let level; //the level will change throughout the game that's why it's global
let level1Scores=[]; // the level 1 scores will not change and will have to accessed through the game that's why it's global
let level1HighScore=0;

let level2Scores=[];
let level2HighScore=0;

let fireGroup;
let peach;
let peachMessage;
let winningMusic;
let tempMessage;

// level select screen variables

let level1Castle;
let level2Castle;
let backHomeBut;
let worldText;
let highScore;
let highScore2=0;
let worldLevel=0;
let clickSound;

//audio variables have to be accessed through the game that's why they're global
let coinCollect;
let marioJump;
let goombaStomp;
let backgroundMusic;
let marioDeadEffect;
let levelCompleteSound;

//text displayer variables

let playerNameDisplayer;
let scoreDisplayer;
let highScoreDisplayer;
let worldDisplayer;

//transition screen variables

let worldInfoText;

//mysteryBlock variables
let mysteryBlocksGroup;
let mysteryBlocksList;
let mysteryBlocksListCopy;
let mysteryBlockHitboxGroup;
let mysteryBlockHitboxList=[];

//grass platform variables
let grassPlatformGroup;
let grassPlatformList;

//brick variables
let bricksList;
let bricksGroup;

// stairs variables
let stairsList;
let stairsGroup;

//tube variables
let smallTube;
let mediumTube;
let bigTube;
let superBigTube;
let tubesGroup;
let tubesList

//goomba variables
let goombaGroup;
let goombaList;
let goombaSpeed=200
let goombaSetback=3

//coin varibles
let coinsList;
let coinsGroup;

let flag;
let ladderGroup;
let ladderList;
let colliderGroup;

let groundBricksGroup;
let levelWidth;
let facingLeft;
let facingRight;

/*----------- FUNCTIONS --------------*/

function bubbleSort(array) 
{
  let temp = 0;
  for (let x=0; x<array.length; x++) {
    for (let y=0; y<array.length-1; y++) {
      if (array[y] > array[y+1]) {
        temp = array[y];
        array[y] = array[y+1];
        array[y+1] = temp;
      }
    }
  }
  return array;
}

function dead()
  {
    if(level==1)
    {
      level1Scores.push(score);
      level1Scores=bubbleSort(level1Scores);
      level1HighScore=level1Scores[level1Scores.length-1]
  
      game.sound.stopAll();
      marioDeadEffect.play();
      game.scene.start("transition");
      game.scene.stop("level1");
    }
    else if(level==2)
    {
      level2Scores.push(score);
      level2Scores=bubbleSort(level2Scores);
      level2HighScore=level2Scores[level2Scores.length-1]
  
      game.sound.stopAll();
      marioDeadEffect.play();
      game.scene.start("transition");
      game.scene.stop("level2");
    }
    else if(level=="FINAL")
    {
      game.sound.stopAll();
      marioDeadEffect.play();
      game.scene.start("transition");
      game.scene.stop("finalLevel");
    }
  }

function editName(string)
  {
    let newString="";
    newString = string.toUpperCase(); // makes the name all uppercase
    
    if(newString.length>15) // if the name is above 15 characters
    {
      newString=newString.substring(0, 15); // make the name the first 15 letters
    }
    return newString;
  }

let name=editName(name2)

// Game starts here

/* ---------------------------------------------HOME SCREEN----------------------------------------------------------------------------------------- */

// mainScreen Scene:

class mainScreen extends Phaser.Scene {

  // mainScreen Constructor
    constructor (config)
    {
      super(config);
    }

  // mainScreen Preload

    preload(){
      this.load.image("homeBackground","assets/sprites/homeBackground.png");
      this.load.image("startMessage", "assets/sprites/startButton.png");
      this.load.image("levelSelect", "assets/sprites/levelSelectButton.png");
      this.load.image("hitbox", "assets/sprites/hitbox.png");
    }

  // mainScreen Create
    create(){
      let width = game.config.width;
      let height = game.config.height;
      this.physics.add.image(width/2,height/2,"homeBackground");
      let startMessage=this.physics.add.image(600, 370, "startMessage").setInteractive();
      let levelSelect=this.physics.add.image(600, 470, "levelSelect").setInteractive();

      startMessage.on('pointerover', function(pointer){
        this.setTint(0xf8D8D8D);
      });

      startMessage.on('pointerout', function(pointer){
        this.clearTint();
      });
  
      startMessage.on("pointerup", function(pointer){
        this.clearTint();
        game.scene.start("level1");
        game.scene.stop("home");
      });

      levelSelect.on('pointerover', function(pointer){
        this.setTint(0xfABABAB);
      });

      levelSelect.on('pointerout', function(pointer){
        this.clearTint();
      });
  
      levelSelect.on("pointerup", function(pointer){
        this.clearTint();
        game.scene.start("levelSelect");
        game.scene.stop("home");
      });
    }
    update(){
      
    }
}//end of mainScreen

/* -------------------------------------------------------------- LEVEL SELECT --------------------------------------------------------- */

class levelSelect extends Phaser.Scene {

  // levelSelect Constructor
    constructor (config)
    {
      super(config);
    }

  // levelSelect Preload

    preload(){
      this.load.image("levelSelectBackground","assets/sprites/levelSelectBackground.png");
      this.load.image("castle1", "assets/sprites/castle1.png");
      this.load.image("castle2", "assets/sprites/castle2.png");
      this.load.image("backHome2", "assets/sprites/backHome.png");
      this.load.audio("click", "assets/effects/buttonClick.mp3")
    }

  // levelSelect Create
    create(){
      let width = game.config.width;
      let height = game.config.height;
      this.physics.add.image(width/2,height/2,"levelSelectBackground");
      level1Castle=this.physics.add.image(665,height/3+90,"castle1").setInteractive();
      level2Castle=this.physics.add.image(1130,height/3+90,"castle2").setScale(0.7).setInteractive();
    
      backHomeBut=this.physics.add.image(220,height/3+54,"backHome2").setScale(0.7).setInteractive();

      clickSound=this.sound.add("click")

      worldText=this.add.text(width/3+80, 30, "WORLD 1-" + worldLevel, {
        fontFamily: "MarioFont",
        fontSize:40,
        color:"#FFFFFF"
      })

      highScore=this.add.text(width/3+80, 80, "HIGHSCORE: 0", {
        fontFamily: "MarioFont",
        fontSize:40,
        color:"#FFFFFF"
      })

      level1Castle.on('pointerover', function(pointer){
        this.setTint(0xf8D8D8D);
        clickSound.play()
        worldLevel=1
        highScore2=level1HighScore;
      });

      level1Castle.on('pointerout', function(pointer){
        this.clearTint();
        worldLevel=0;
        highScore2=0;
      });
  
      level1Castle.on("pointerup", function(pointer){
        this.clearTint();
        game.scene.start("level1");
        game.scene.stop("levelSelect");
      });
      
      level2Castle.on('pointerover', function(pointer){
        this.setTint(0xf8D8D8D);
        clickSound.play()
        worldLevel=2
        highScore2=level2HighScore;
      });

      level2Castle.on('pointerout', function(pointer){
        this.clearTint();
        worldLevel=0;
        highScore2=0;
      });
  
      level2Castle.on("pointerup", function(pointer){
        this.clearTint();
        game.scene.start("level2");
        game.scene.stop("levelSelect");
      });

      backHomeBut.on('pointerover', function(pointer){
        this.setTint(0xf8D8D8D);
      });

      backHomeBut.on('pointerout', function(pointer){
        this.clearTint();
      });
  
      backHomeBut.on("pointerup", function(pointer){
        this.clearTint();
        game.scene.start("home");
        game.scene.stop("levelSelect");
      });

    }
    update(){
      worldText.text="WORLD 1-"+worldLevel
      highScore.text="HIGH SCORE: "+highScore2;
    }
}//end of levelSelect

/* ---------------------------------------------FINAL LEVEL----------------------------------------------------------------------------------------- */
class finalLevel extends Phaser.Scene {

  // finalLevel Constructor
    constructor (config)
    {
      super(config);
    }

  // finalLevel Preload

    preload(){
      this.load.image("groundBrick","assets/sprites/groundBrick.png");
      this.load.atlas("mario", "assets/sprites/mario.png", "assets/sprites/marioSpritesheet.json");
      this.load.image("platformBrick", "assets/sprites/brick.png");
      this.load.image("bgImage", "assets/sprites/finalLevelBackground.png");
      this.load.image("fire", "assets/sprites/fire.png");
      this.load.audio("marioDead", "assets/effects/marioDead.mp3");
      this.load.image("princessPeach", "assets/sprites/princessPeach.png")
      this.load.audio("bgTheme", "assets/music/finalBackgroundMusic.mp3");
      this.load.audio("marioJump", "assets/effects/marioJumpEffect.mp3");
      this.load.audio("levelComplete", "assets/effects/levelCompleteSound.mp3")
      this.load.audio("winningMusic", "assets/music/winningMusic.mp3")
    }

  // mainScreen Create
    create(){
      level="FINAL";
      score=0;
      let width = game.config.width;
      let height = game.config.height;
      //creating background
      bg = this.add.tileSprite(0, 28, width, height, "bgImage");
      bg.setOrigin(0);
      bg.setScrollFactor(0, 1);

      //adding audio
      marioJump=this.sound.add("marioJump");
      marioDeadEffect=this.sound.add("marioDead");
      backgroundMusic = this.sound.add("bgTheme");
      levelCompleteSound = this.sound.add("levelComplete");
      winningMusic = this.sound.add("winningMusic")
      backgroundMusic.loop = true;
      backgroundMusic.play();

      //creating player
      player=this.physics.add.sprite(40, height-70, "mario", "runningRight0000");
      player.enableBody=true;
      player.body.gravity.y=2000;

      playerNameDisplayer=this.add.text(20, 40, name, {
        fontFamily:"MarioFont", 
        fontSize:30, 
        color:"#FFFFFF"
      })
      playerNameDisplayer.setScrollFactor(0);
      worldDisplayer=this.add.text(950, 40, "WORLD 1-"+level, {
        fontFamily:"MarioFont", 
        fontSize:30, 
        color:"#FFFFFF"
      })
      worldDisplayer.setScrollFactor(0);
      
      //creating static groups

      groundBricksGroup = this.physics.add.staticGroup();
      bricksGroup = this.physics.add.staticGroup();
      fireGroup = this.physics.add.staticGroup();
      
      colliderGroup = this.physics.add.staticGroup();

      //add bricks

      //outer walls
      bricksGroup.add(this.add.tileSprite(500, height-260, 40, 400, "platformBrick"));
      bricksGroup.add(this.add.tileSprite(730, height-450, 500, 40, "platformBrick"));
      bricksGroup.add(this.add.tileSprite(1000, height-255, 40, 425, "platformBrick"));
      bricksGroup.add(this.add.tileSprite(740, height-300, 500, 40, "platformBrick"));

      this.addBrick(260, height-70);
      this.addBrick(300, height-70);
      this.addBrick(340, height-70);
      this.addBrick(380, height-70);
      this.addBrick(420, height-70);
      this.addBrick(460, height-70);
      this.addBrick(500, height-70);
      
      this.addFire(300, height-100, 100)

      this.addBrick(20, height-200);
      this.addBrick(60, height-200);
      this.addBrick(100, height-200);
      this.addBrick(140, height-200);

      this.addBrick(260, height-350);
      this.addBrick(300, height-350);
      this.addBrick(340, height-350);
      this.addBrick(380, height-350);
      this.addBrick(420, height-350);
      this.addBrick(460, height-350);
      this.addBrick(500, height-350);

      this.addFire(390, height-375, 180)
      this.addFire(800, height-480, 210)
      this.addFire(750, height-50, 455)

      tempMessage=this.add.text(680, height/2+170, "SAVE PEACH!", {
        fontFamily: "MarioFont",
        fontSize:30,
        color:"#FFFFFF"
      })

      //creating ground
      groundBricksGroup.add((this.add.tileSprite(0, height-40, width, 80, "groundBrick")).setOrigin(0, 0));

      //creating camera

      this.cameras.main.setBounds(0, 0, width, 670);

      //creating keys
      up=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      down=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      left=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      right=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

      //adding colliders
      this.physics.add.collider(player, groundBricksGroup);
      this.physics.add.collider(player, bricksGroup);
      player.body.collideWorldBounds=true;
      
      //creating animations

      this.anims.create({
        key: 'runningRight',
        frames: this.anims.generateFrameNames("mario", {prefix: "runningRight", end: 3, zeroPad:4}),
        frameRate: 10,
        repeat: 0,
      });
      
      this.anims.create({
        key: 'runningLeft',
        frames: this.anims.generateFrameNames("mario", {prefix: "runningLeft", end: 3, zeroPad:4}),
        frameRate: 10,
        repeat: 0,
      });

      //adding lists

      bricksList=bricksGroup.getChildren();
      
      for(let i=0; i<bricksList.length; i++)
        {
          colliderGroup.add(bricksList[i])
        }

      //adding peach
      peach=this.physics.add.image(1050, height-200, "princessPeach");
      peach.enableBody=true;
      peach.body.gravity.y=2000;
      this.physics.add.collider(peach, groundBricksGroup);

      peachMessage=this.add.text(950, height/2+200, ".", {
        fontFamily: "MarioFont",
        fontSize:20,
        color:"#FFFFFF"
      })
      
    }
    update(){
      bg.setTilePosition(this.cameras.main.scrollY);
      playerSpeed=400;
      player.setVelocityX(0);


      if(left.isDown) 
      {
        facingLeft=true;
        facingRight=false;
        if(player.x>0)
        {
          player.setVelocityX(-playerSpeed);
          player.anims.play("runningLeft", true);
          if(this.physics.world.overlap(player,colliderGroup))
          {
            player.setVelocityX(0);
            player.x+=5;
          }
        }
      }
      else if(right.isDown)
      {
        facingLeft=false;
        facingRight=true;
        player.setVelocityX(playerSpeed);
        player.anims.play("runningRight", true); 
        if(this.physics.world.overlap(player,colliderGroup))
        {
          player.setVelocityX(0);
          player.x-=5;
        }
      }

      if(player.body.velocity.x==0 && player.body.velocity.y==0)
        {
          if(facingLeft==true)
          {
            player.setTexture("mario", "runningLeft0000");
          }
          else if(facingRight==true)
          {
            player.setTexture("mario", "runningRight0000");
          }
        }

      if(player.body.velocity.y<0 && player.body.touching.down==false)
      {
        if(facingLeft==true)
          {
            player.setTexture("mario", "jumpingLeft");
          }
          else if(facingRight==true)
          {
            player.setTexture("mario", "jumpingRight");
          }
      }

      // player jumps
      
      else if(up.isDown && player.body.touching.down)
      {
        if(this.physics.world.overlap(player,colliderGroup))
        {
          player.setVelocityY(0);
        }
        else
        {
          if(facingLeft==true)
          {
            player.setTexture("mario", "jumpingLeft");       
            player.setVelocityY(-850);
            marioJump.play();
          }
          else if(facingRight==true)
          {
            player.setTexture("mario", "jumpingRight");
            player.setVelocityY(-850);
            marioJump.play();
          }
        }
      }
      if(this.physics.world.overlap(player, fireGroup))
      {
        dead();
      }
      
      try{
        if(this.physics.world.overlap(player, peach))
        {
          player.x=740;
          player.y=300;
          tempMessage.text=""
          game.sound.stopAll();
          winningMusic.play();
          
          peachMessage.text="THANK YOU MARIO!"
          
          let startNewLevel=()=>{
            game.sound.stopAll();
            game.scene.start("home");
            game.scene.stop("finalLevel");
          }
          setTimeout(startNewLevel, 12000)
        }
      }
      catch(err){}
    }

  addBrick(x, y)
  {
    let brick=this.add.tileSprite(x, y, 40, 40, "platformBrick")
    bricksGroup.add(brick);
  }
  addFire(x, y, width)
  {
    let fire=this.add.tileSprite(x, y, width, 10, "fire");
    fireGroup.add(fire);
  }
  
}//end of finalLevel

/* ---------------------------------------------TRANSITION----------------------------------------------------------------------------------------- */

//Transition in between deaths screen

class transition extends Phaser.Scene {

  // transition Constructor
    constructor (config)
    {
      super(config);
    }

  // transition Preload

    preload(){
      this.load.image("backgroundScreen","assets/sprites/transitionBackground.png");
      this.load.image("backHome", "assets/sprites/backHomeButton.png");
      this.load.image("retryLevel", "assets/sprites/retryLevelButton.png");
    }

  // transition Create
    create(){
      let width = game.config.width;
      let height = game.config.height;
      this.physics.add.image(width/2, height/2, "backgroundScreen");

      worldInfoText=this.add.text(width/2-50, height/8, "WORLD 1-", {
        fontFamily: "MarioFont",
        fontSize:20,
        color:"#FFFFFF"
      })

      this.add.text(width/2-150, height/4, "You  Died !", {
        fontFamily: "MarioFont",
        fontSize:70,
        color:"#FFFFFF"
      })
      
      let retryLevel=this.physics.add.image(600, 340, "retryLevel").setInteractive().setScale(0.5);
      let backHome=this.physics.add.image(600, 470, "backHome").setInteractive().setScale(0.5);

      retryLevel.on('pointerover', function(pointer){
        this.setTint(0xf8D8D8D);
      });

      retryLevel.on('pointerout', function(pointer){
        this.clearTint();
      });

      if(level==1)
      {
        retryLevel.on("pointerup", function(pointer){
        this.clearTint();
        game.scene.start("level1");
        game.scene.stop("transition");
        });
      }

      else if(level==2)
      {
        retryLevel.on("pointerup", function(pointer){
        this.clearTint();
        game.scene.start("level2");
        game.scene.stop("transition");
        });
      }

      else if(level=="FINAL")
      {
        retryLevel.on("pointerup", function(pointer){
        this.clearTint();
        game.scene.start("finalLevel");
        game.scene.stop("transition");
        });
      }

      backHome.on('pointerover', function(pointer){
        this.setTint(0xfABABAB);
      });

      backHome.on('pointerout', function(pointer){
        this.clearTint();
      });
  
      backHome.on("pointerup", function(pointer){
        game.scene.start("home");
        game.scene.stop("transition");
      });
    }
    update(){
      worldInfoText.text="WORLD 1-"+level
    }
}//end of transition

/* ---------------------------------------------LEVEL 1----------------------------------------------------------------------------------------- */

//levelOne Scene:

class levelOne extends Phaser.Scene {
  
  //levelOne Screen constructor
  
    constructor (config)
    {
      super(config);
    }
  
    // levelOne Screen Preload
  
    preload ()
    {
      this.load.image("groundBrick","assets/sprites/groundBrick.png");
      this.load.image("background","assets/sprites/background.png");
      this.load.image("platformBrick", "assets/sprites/brick.png");
      this.load.image("mysteryBlock", "assets/sprites/mysteryBlock.png");
      this.load.image("emptyBlock", "assets/sprites/emptyBlock.png");
      this.load.image("ladder", "assets/sprites/ladder.png");
      this.load.image("stairBlock", "assets/sprites/stairBlock.png");
      this.load.image("flag", "assets/sprites/flag.png");
      this.load.image("castle", "assets/sprites/castle.png");
      this.load.atlas("mario", "assets/sprites/mario.png", "assets/sprites/marioSpritesheet.json");
      this.load.atlas("tubes", "assets/sprites/tubes.png", "assets/sprites/tubesSpritesheet.json");
      this.load.atlas("coins", "assets/sprites/coins.png", "assets/sprites/coinsSpritesheet.json");
      this.load.atlas("goomba", "assets/sprites/goomba.png", "assets/sprites/goombaSpritesheet.json");
      this.load.audio("backgroundThemeSong", "assets/music/backgroundThemeSong.mp3");
      this.load.audio("coinCollect", "assets/effects/coinEffect.mp3");
      this.load.audio("goombaDead", "assets/effects/goombaDeadEffect.mp3");
      this.load.audio("marioJump", "assets/effects/marioJumpEffect.mp3");
      this.load.audio("marioDead", "assets/effects/marioDead.mp3");
      this.load.audio("levelComplete", "assets/effects/levelCompleteSound.mp3")
    }
  
  // levelOne Screen Create
  
    create (data)
    {
      levelWidth=20000
      level=1;
      score=0;
      let width = game.config.width;
      let height = game.config.height;
      //creating background
      bg = this.add.tileSprite(0, 28, levelWidth, 670, "background");
      bg.setOrigin(0);
      bg.setScrollFactor(0, 1);

      //adding audio

      coinCollect=this.sound.add("coinCollect");
      goombaStomp=this.sound.add("goombaDead", {volume: 10});
      marioJump=this.sound.add("marioJump");
      marioDeadEffect=this.sound.add("marioDead");
      backgroundMusic = this.sound.add("backgroundThemeSong");
      levelCompleteSound = this.sound.add("levelComplete");
      backgroundMusic.loop = true;
      backgroundMusic.play();

      //creating player
      player=this.physics.add.sprite(40, height-70, "mario", "runningRight0000");
      player.enableBody=true;
      player.body.gravity.y=2000;

      playerNameDisplayer=this.add.text(20, 40, name, {
        fontFamily:"MarioFont", 
        fontSize:30, 
        color:"#FFFFFF"
      })
      playerNameDisplayer.setScrollFactor(0);
      worldDisplayer=this.add.text(1000, 40, "WORLD 1-"+level, {
        fontFamily:"MarioFont", 
        fontSize:30, 
        color:"#FFFFFF"
      })
      worldDisplayer.setScrollFactor(0);
      highScoreDisplayer=this.add.text(500, 40, "HIGH SCORE: "+level1HighScore, {
        fontFamily:"MarioFont", 
        fontSize:30, 
        color:"#FFFFFF"
      })
      highScoreDisplayer.setScrollFactor(0);
      
      //creating static groups

      groundBricksGroup = this.physics.add.staticGroup();
      mysteryBlocksGroup = this.physics.add.staticGroup();
      bricksGroup = this.physics.add.staticGroup();
      mysteryBlockHitboxGroup = this.physics.add.staticGroup();
      tubesGroup = this.physics.add.staticGroup();
      coinsGroup = this.physics.add.staticGroup();
      goombaGroup = this.physics.add.staticGroup();
      ladderGroup = this.physics.add.staticGroup();
      stairsGroup = this.physics.add.staticGroup();
      
      colliderGroup = this.physics.add.staticGroup();

      //creating blocks
      this.addMysteryBlock(300, height-190);
      this.addBrick(530, height-190);   
      this.addMysteryBlock(570, height-190);
      this.addBrick(610, height-190);
      this.addMysteryBlock(610, height-380);
      this.addMysteryBlock(650, height-190);
      this.addBrick(690, height-190);

      this.addBrick(2460, height-190);
      this.addBrick(2500, height-190);
      this.addBrick(2540, height-190);
      this.addBrick(2580, height-190);
      this.addBrick(2620, height-190);
      this.addBrick(2660, height-190);
      this.addMysteryBlock(2540, height-370);
      this.addMysteryBlock(2580, height-370);
      this.addBrick(2960, height-210);
      this.addBrick(3000, height-210);
      this.addBrick(3040, height-210);
      this.addBrick(3080, height-210);
      this.addBrick(3420, height-220);
      this.addBrick(3460, height-220);
      this.addBrick(3500, height-220);
      this.addBrick(3540, height-220);


      mysteryBlocksList=mysteryBlocksGroup.getChildren();

      for(let i=0; i<mysteryBlocksList.length; i++)
        {
          let mysteryBlock=mysteryBlocksList[i]
          mysteryBlockHitboxGroup.add(this.add.tileSprite(mysteryBlock.x, mysteryBlock.y+20, 5, 2, "hitbox"))
        }
      
      //creating ground
      groundBricksGroup.add((this.add.tileSprite(0, height-40, 1450, 80, "groundBrick")).setOrigin(0, 0));
      groundBricksGroup.add((this.add.tileSprite(1650, height-40, 450, 80, "groundBrick")).setOrigin(0, 0));
      groundBricksGroup.add((this.add.tileSprite(2300, height-40, 550, 80, "groundBrick")).setOrigin(0, 0));
      groundBricksGroup.add((this.add.tileSprite(3700, height-40, 10000, 80, "groundBrick")).setOrigin(0, 0));

      //creating tubes
      tubesGroup.add(this.add.sprite(1000, height-80, "tubes", "smallTube"));
      tubesGroup.add(this.add.sprite(1370, height-130, "tubes", "bigTube"));
      tubesGroup.add(this.add.sprite(1750, height-155, "tubes", "superBigTube"));

      tubesList=tubesGroup.getChildren();

      //creating ladders
      for(let x=0; x<tubesList.length; x++)
        {
          let tube=tubesList[x]
          ladderGroup.add(this.add.tileSprite(tube.x+40, tube.y, 20, tube.height-10, "ladder"))
        }

      stairsGroup.add(this.add.tileSprite(3900, height-60, 40, 40, "stairBlock"));
      stairsGroup.add(this.add.tileSprite(3940, height-80, 40, 80, "stairBlock"));
      stairsGroup.add(this.add.tileSprite(3980, height-100, 40, 120, "stairBlock"));
      stairsGroup.add(this.add.tileSprite(4020, height-120, 40, 160, "stairBlock"));
      stairsGroup.add(this.add.tileSprite(4060, height-140, 40, 200, "stairBlock"));
      stairsGroup.add(this.add.tileSprite(4100, height-140, 40, 200, "stairBlock"));
      ladderGroup.add(this.add.tileSprite(4140, height-140, 20, 200, "ladder"))

      stairsGroup.add(this.add.tileSprite(4360, height-140, 40, 200, "stairBlock"));
      stairsGroup.add(this.add.tileSprite(4400, height-140, 40, 200, "stairBlock"));
      stairsGroup.add(this.add.tileSprite(4440, height-120, 40, 160, "stairBlock"));
      stairsGroup.add(this.add.tileSprite(4480, height-100, 40, 120, "stairBlock"));
      stairsGroup.add(this.add.tileSprite(4520, height-80, 40, 80, "stairBlock"));
      stairsGroup.add(this.add.tileSprite(4560, height-60, 40, 40, "stairBlock"));

      // creating coins
      coinsGroup.add(this.add.sprite(1000, height-140, "coins", "coinsUp0001"));
      coinsGroup.add(this.add.sprite(1370, height-240, "coins", "coinsUp0001"));
      coinsGroup.add(this.add.sprite(1750, height-290, "coins", "coinsUp0001"));
      

      // creating goomba enemy

      goombaGroup.add(this.physics.add.sprite(1200, height-70, "goomba", "goombaRunning0000"));
      goombaGroup.add(this.physics.add.sprite(2560, height-70, "goomba", "goombaRunning0000"));
      goombaGroup.add(this.physics.add.sprite(4900, height-70, "goomba", "goombaRunning0000"));

      goombaList=goombaGroup.getChildren();

      for(let i=0; i<goombaList.length; i++)
        {
          let goomba=goombaList[i]
          goomba.enableBody=true;
          goomba.body.gravity.y=2000;
        }

      //creating camera

      this.cameras.main.setBounds(0, 0, 6000, 600);
      this.cameras.main.startFollow(player);

      //creating keys
      up=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      down=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      left=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      right=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

      //adding colliders
      this.physics.add.collider(player, groundBricksGroup);
      this.physics.add.collider(player, mysteryBlocksGroup);
      this.physics.add.collider(player, bricksGroup);
      this.physics.add.collider(player, tubesGroup);
      this.physics.add.collider(player, ladderGroup)
      this.physics.add.collider(player, stairsGroup);
      this.physics.add.collider(player, ladderGroup);

      this.physics.add.collider(goombaGroup, groundBricksGroup);

      
      //creating animations

      this.anims.create({
        key: 'runningRight',
        frames: this.anims.generateFrameNames("mario", {prefix: "runningRight", end: 3, zeroPad:4}),
        frameRate: 10,
        repeat: 0,
      });
      this.anims.create({
        key: 'runningLeft',
        frames: this.anims.generateFrameNames("mario", {prefix: "runningLeft", end: 3, zeroPad:4}),
        frameRate: 10,
        repeat: 0,
      });

      this.anims.create({
        key: 'coinUp',
        frames: this.anims.generateFrameNames("coins", {prefix: "coinsUp", end: 5, zeroPad:4}),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: 'goombaRunning',
        frames: this.anims.generateFrameNames("goomba", {prefix: "goombaRunning", end: 1, zeroPad:4}),
        frameRate: 10,
        repeat: -1,
      })

      //adding lists

      bricksList=bricksGroup.getChildren();
      mysteryBlocksListCopy = mysteryBlocksList.slice();
      mysteryBlockHitboxList=mysteryBlockHitboxGroup.getChildren();
      stairsList=stairsGroup.getChildren();
      coinsList=coinsGroup.getChildren();

      for(let x=0; x<coinsList.length; x++)
        {
          coinsList[x].anims.play("coinUp")
        }
      
      for(let i=0; i<bricksList.length; i++)
        {
          colliderGroup.add(bricksList[i])
        }
      for(let i=0; i<tubesList.length; i++)
        {
          colliderGroup.add(tubesList[i])
        }
      for(let i=0; i<mysteryBlocksList.length; i++)
        {
          colliderGroup.add(mysteryBlocksList[i])
        }
      for(let i=0; i<stairsGroup.length; i++)
        {
          colliderGroup.add(stairsGroup[i])
        }

      flag=this.physics.add.image(5500, 450, "flag")
      this.physics.add.image(flag.x+200, 550, "castle").setScale(0.5)

      //add text

      scoreDisplayer=this.add.text(20, 75, "SCORE: 0", {
        fontFamily:"MarioFont", 
        fontSize:30, color:"#FFFFFF"
      })
      scoreDisplayer.setScrollFactor(0)
    }

  //levelOne update
  
    update()
    {
      bg.setTilePosition(this.cameras.main.scrollX);
      playerSpeed=400;
      player.setVelocityX(0);

      //player movement left and right
      if(left.isDown) 
      {
        facingLeft=true;
        facingRight=false;
        if(player.x>0)
        {
          player.setVelocityX(-playerSpeed);
          player.anims.play("runningLeft", true);
          if(this.physics.world.overlap(player,colliderGroup))
          {
            player.setVelocityX(0);
            player.x+=5;
          }
        }
      }
      else if(right.isDown)
      {
        facingLeft=false;
        facingRight=true;
        player.setVelocityX(playerSpeed);
        player.anims.play("runningRight", true); 
        if(this.physics.world.overlap(player,colliderGroup))
        {
          player.setVelocityX(0);
          player.x-=5;
        }
      }

      if(player.body.velocity.x==0 && player.body.velocity.y==0)
        {
          if(facingLeft==true)
          {
            player.setTexture("mario", "runningLeft0000");
          }
          else if(facingRight==true)
          {
            player.setTexture("mario", "runningRight0000");
          }
        }

      if(player.body.velocity.y<0 && player.body.touching.down==false)
      {
        if(facingLeft==true)
          {
            player.setTexture("mario", "jumpingLeft");
          }
          else if(facingRight==true)
          {
            player.setTexture("mario", "jumpingRight");
          }
      }

      if(up.isDown && this.physics.world.overlap(player, ladderGroup))
      {
        player.setVelocityY(-550);
      }

      // player jumps
      
      else if(up.isDown && player.body.touching.down)
      {
        if(this.physics.world.overlap(player,colliderGroup))
        {
          player.setVelocityY(0);
        }
        else
        {
          player.setVelocityY(-850);
          marioJump.play();
        }
      }

      // if the player hits the mystery block

      for(let x=0; x<mysteryBlockHitboxList.length; x++)
        {
          let coin;
          let hitbox=mysteryBlockHitboxList[x];
          let mBlock=mysteryBlocksListCopy[x];
          if(this.physics.world.overlap(player,hitbox))
          {
            player.y+=5;
            coin=this.add.sprite(mysteryBlockHitboxList[x].x, mysteryBlockHitboxList[x].y-57, "coins", "coinsUp0001");
            coin.anims.play("coinUp");
            coinsGroup.add(coin);
            mBlock.setTexture("emptyBlock")
            mysteryBlockHitboxList.splice(x, 1)
            mysteryBlocksListCopy.splice(x, 1)
          }
        }
      this.physics.add.collider(player, mysteryBlocksGroup);

      // if the player collides with a coin
      coinsList=coinsGroup.getChildren();
      for(let i=0; i<coinsList.length; i++)
        {
          let coin=coinsList[i];
          if(this.physics.world.overlap(player,coin))
          {
            coinCollect.play();
            score+=50;
            coin.destroy();
          }
        }

      for(let x=0; x<goombaList.length; x++)
        {
          let goomba=goombaList[x]
          this.physics.add.collider(player, goomba);
          // moving the goomba enemy
          if(goomba.body.velocity.x == 200 || goomba.body.velocity.x == -200)
          {
            goomba.anims.play("goombaRunning", true)  
          }
        
          if(this.physics.world.overlap(goomba, colliderGroup))
          {
            goombaSpeed*=-1;
            goombaSetback*=-1;
            goomba.x+=goombaSetback;
          }
          goomba.setVelocityX(goombaSpeed)
        
          if(player.body.touching.down && goomba.body.touching.up)
          {
            goombaStomp.play();
            goomba.setTexture("goomba", "goombaSquished")
            goomba.destroy();
            score+=100;
          }
        
          else if(this.physics.world.overlap(player, goomba))
          {
            dead();
          }
        
          else if(player.x+28==goomba.x-24)
          {
            dead();
          }
          else if(player.x-28==goomba.x+24)
          {
            dead();
          }
          else if(player.x+28==goomba.x+24)
          {
            dead();
          }
          else if(player.x-28==goomba.x-24)
          {
            dead();
          }
        }
      scoreDisplayer.text="SCORE: " + score;

      //if the player collides with the flag
      try{
        if(this.physics.world.overlap(player, flag))
        {
          level1Scores.push(score);
          level1Scores=bubbleSort(level1Scores);
          level1HighScore=level1Scores[level1Scores.length-1]
  
          player.x+=5000
      
          game.sound.stopAll();
          levelCompleteSound.play();
  
          let startNewLevel=()=>{
            game.scene.start("level2");
            game.scene.stop("level1");
          }
          setTimeout(startNewLevel, 5000)
        }
      }
      catch(err){}
      //if player falls through the floor
      if(this.isUnderMap()==true)
      {
        dead();
      }
    }

  addBrick(x, y)
  {
    let brick=this.add.tileSprite(x, y, 40, 40, "platformBrick")
    bricksGroup.add(brick);
  }

  addMysteryBlock(x, y)
  {
    mysteryBlocksGroup.add(this.add.tileSprite(x, y, 40, 40, "mysteryBlock"));
  }

  isUnderMap()
  {
    if(player.y>800)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}//end of level 1


/* ---------------------------------------------LEVEL 2----------------------------------------------------------------------------------------- */

class levelTwo extends Phaser.Scene {
    constructor (config)
    {
      super(config);
    }

    preload(){
      this.load.image("groundBrick","assets/sprites/groundBrick.png");
      this.load.image("background","assets/sprites/background.png");
      this.load.image("platformBrick", "assets/sprites/brick.png");
      this.load.image("mysteryBlock", "assets/sprites/mysteryBlock.png");
      this.load.image("emptyBlock", "assets/sprites/emptyBlock.png");
      this.load.image("ladder", "assets/sprites/ladder.png");
      this.load.image("stairBlock", "assets/sprites/stairBlock.png");
      this.load.image("flag", "assets/sprites/flag.png");
      this.load.image("castle", "assets/sprites/castle.png");
      this.load.image("grassPlatform", "assets/sprites/grassPlatform.png");
      this.load.atlas("mario", "assets/sprites/mario.png", "assets/sprites/marioSpritesheet.json");
      this.load.atlas("coins", "assets/sprites/coins.png", "assets/sprites/coinsSpritesheet.json");
      this.load.atlas("goomba", "assets/sprites/goomba.png", "assets/sprites/goombaSpritesheet.json");
      this.load.atlas("tubes", "assets/sprites/tubes.png", "assets/sprites/tubesSpritesheet.json");
      this.load.audio("backgroundThemeSong2", "assets/music/backgroundThemeSong2.mp3");
      this.load.audio("coinCollect", "assets/effects/coinEffect.mp3");
      this.load.audio("goombaDead", "assets/effects/goombaDeadEffect.mp3");
      this.load.audio("marioJump", "assets/effects/marioJumpEffect.mp3");
      this.load.audio("marioDead", "assets/effects/marioDead.mp3");
      this.load.audio("levelComplete", "assets/effects/levelCompleteSound.mp3");
    }
    create(){
      let goombaSpeed=300
      let goombaSetback=-3
      levelWidth=15000
      level=2;
      score=0;
      let width = game.config.width;
      let height = game.config.height;
      //creating background
      bg = this.add.tileSprite(0, 28, levelWidth, 670, "background");
      bg.setOrigin(0);
      bg.setScrollFactor(0, 1);

      //adding audio

      coinCollect=this.sound.add("coinCollect");
      goombaStomp=this.sound.add("goombaDead", {volume: 10});
      marioJump=this.sound.add("marioJump");
      marioDeadEffect=this.sound.add("marioDead");
      backgroundMusic = this.sound.add("backgroundThemeSong2", {volume: 3});
      levelCompleteSound = this.sound.add("levelComplete");
      backgroundMusic.loop = true;
      backgroundMusic.play();

      //creating player
      player=this.physics.add.sprite(40, height-70, "mario", "runningRight0000");
      player.enableBody=true;
      player.body.gravity.y=2000;

      playerNameDisplayer=this.add.text(20, 40, name, {
        fontFamily:"MarioFont", 
        fontSize:30, 
        color:"#FFFFFF"
      })
      playerNameDisplayer.setScrollFactor(0);
      worldDisplayer=this.add.text(1000, 40, "WORLD 1-"+level, {
        fontFamily:"MarioFont", 
        fontSize:30, 
        color:"#FFFFFF"
      })
      worldDisplayer.setScrollFactor(0);
      highScoreDisplayer=this.add.text(500, 40, "HIGH SCORE: "+level2HighScore, {
        fontFamily:"MarioFont", 
        fontSize:30, 
        color:"#FFFFFF"
      })
      highScoreDisplayer.setScrollFactor(0);
      
      //creating static groups

      groundBricksGroup = this.physics.add.staticGroup();
      mysteryBlocksGroup = this.physics.add.staticGroup();
      bricksGroup = this.physics.add.staticGroup();
      mysteryBlockHitboxGroup = this.physics.add.staticGroup();
      coinsGroup = this.physics.add.staticGroup();
      goombaGroup = this.physics.add.staticGroup();
      ladderGroup = this.physics.add.staticGroup();
      stairsGroup = this.physics.add.staticGroup();
      tubesGroup = this.physics.add.staticGroup();
      grassPlatformGroup = this.physics.add.staticGroup();
      
      colliderGroup = this.physics.add.staticGroup();

      //creating blocks
      this.addBrick(530, height-190);   
      this.addMysteryBlock(570, height-190);
      this.addBrick(610, height-190);
      this.addMysteryBlock(650, height-190);
      this.addBrick(690, height-190);

      this.addBrick(5400, height-190);
      this.addBrick(5440, height-190);
      this.addBrick(5480, height-190);

      this.addBrick(5620, height-330);
      this.addBrick(5660, height-330);
      this.addBrick(5700, height-330);
      this.addMysteryBlock(5750, height-500);

      this.addBrick(2450, height-150);
      this.addMysteryBlock(2500, height-360)

      this.addMysteryBlock(3000, height-600)
      this.addMysteryBlock(4180, height-600);
      this.addMysteryBlock(4220, height-600);

      mysteryBlocksList=mysteryBlocksGroup.getChildren();

      for(let i=0; i<mysteryBlocksList.length; i++)
        {
          let mysteryBlock=mysteryBlocksList[i]
          mysteryBlockHitboxGroup.add(this.add.tileSprite(mysteryBlock.x, mysteryBlock.y+20, 5, 2, "hitbox"))
        }

      //creating platforms
      this.addPlatform(1300, height-130);
      this.addPlatform(1900, height-140);
      this.addPlatform(2500, height-50);
      ladderGroup.add(this.add.tileSprite(2800, height-300, 20, 150, "ladder"));
      this.addPlatform(3000, height-400);
      this.addPlatform(3600, height-50);
      ladderGroup.add(this.add.tileSprite(3950, height-300, 20, 150, "ladder"));
      this.addPlatform(4200, height-400);
      ladderGroup.add(this.add.tileSprite(6120, height-140, 20, 200, "ladder"));

      ladderList=ladderGroup.getChildren();

      for(let i=0; i<ladderList.length; i++)
        {
          ladderList[i].enableBody=true;
        }
      
      //creating ground
      groundBricksGroup.add((this.add.tileSprite(0, height-40, 1300, 80, "groundBrick")).setOrigin(0, 0));
      groundBricksGroup.add((this.add.tileSprite(4300, height-40, 10000, 80, "groundBrick")).setOrigin(0, 0));

      //creating tubes
      tubesGroup.add(this.add.sprite(4700, height-80, "tubes", "smallTube"));
      tubesGroup.add(this.add.sprite(5070, height-130, "tubes", "bigTube"));

      tubesList=tubesGroup.getChildren();

      //creating ladders
      for(let x=0; x<tubesList.length; x++)
        {
          let tube=tubesList[x]
          ladderGroup.add(this.add.tileSprite(tube.x+40, tube.y, 20, tube.height-10, "ladder"))
        }

      // creating stairs

      stairsGroup.add(this.add.tileSprite(5900, height-60, 40, 40, "stairBlock"));
      stairsGroup.add(this.add.tileSprite(5940, height-80, 40, 80, "stairBlock"));
      stairsGroup.add(this.add.tileSprite(5980, height-100, 40, 120, "stairBlock"));
      stairsGroup.add(this.add.tileSprite(6020, height-120, 40, 160, "stairBlock"));
      stairsGroup.add(this.add.tileSprite(6060, height-140, 40, 200, "stairBlock"));
      stairsGroup.add(this.add.tileSprite(6100, height-140, 40, 200, "stairBlock"));

      stairsGroup.add(this.add.tileSprite(6450, height-140, 40, 200, "stairBlock"));
      stairsGroup.add(this.add.tileSprite(6490, height-140, 40, 200, "stairBlock"));
      stairsGroup.add(this.add.tileSprite(6530, height-120, 40, 160, "stairBlock"));
      stairsGroup.add(this.add.tileSprite(6570, height-100, 40, 120, "stairBlock"));
      stairsGroup.add(this.add.tileSprite(6610, height-80, 40, 80, "stairBlock"));
      stairsGroup.add(this.add.tileSprite(6650, height-60, 40, 40, "stairBlock"));

      // creating coins
      coinsGroup.add(this.add.sprite(1000, height-140, "coins", "coinsUp0001"));
      coinsGroup.add(this.add.sprite(1250, height-240, "coins", "coinsUp0001"));
      coinsGroup.add(this.add.sprite(4700, height-150, "coins", "coinsUp0001"));
      coinsGroup.add(this.add.sprite(5070, height-260, "coins", "coinsUp0001"));

      // creating goomba enemy

      goombaGroup.add(this.physics.add.sprite(1000, height-70, "goomba", "goombaRunning0000"));
      goombaGroup.add(this.physics.add.sprite(900, height-70, "goomba", "goombaRunning0000"));
      goombaGroup.add(this.physics.add.sprite(800, height-70, "goomba", "goombaRunning0000"));
      goombaGroup.add(this.physics.add.sprite(4900, height-70, "goomba", "goombaRunning0000"));

      goombaList=goombaGroup.getChildren();

      for(let i=0; i<goombaList.length; i++)
        {
          let goomba=goombaList[i]
          goomba.enableBody=true;
          goomba.body.gravity.y=2000;
        }

      //creating camera

      this.cameras.main.setBounds(0, 0, 7300, 600);
      this.cameras.main.startFollow(player);

      //creating keys
      up=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      down=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      left=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      right=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

      //adding colliders
      this.physics.add.collider(player, groundBricksGroup);
      this.physics.add.collider(player, grassPlatformGroup)
      this.physics.add.collider(player, mysteryBlocksGroup);
      this.physics.add.collider(player, bricksGroup);
      this.physics.add.collider(player, tubesGroup);
      this.physics.add.collider(player, stairsGroup);

      this.physics.add.collider(goombaGroup, groundBricksGroup);

      
      //creating animations

      this.anims.create({
        key: 'runningRight',
        frames: this.anims.generateFrameNames("mario", {prefix: "runningRight", end: 3, zeroPad:4}),
        frameRate: 10,
        repeat: 0,
      });
      this.anims.create({
        key: 'runningLeft',
        frames: this.anims.generateFrameNames("mario", {prefix: "runningLeft", end: 3, zeroPad:4}),
        frameRate: 10,
        repeat: 0,
      });

      this.anims.create({
        key: 'coinUp',
        frames: this.anims.generateFrameNames("coins", {prefix: "coinsUp", end: 5, zeroPad:4}),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: 'goombaRunning',
        frames: this.anims.generateFrameNames("goomba", {prefix: "goombaRunning", end: 1, zeroPad:4}),
        frameRate: 10,
        repeat: -1,
      })

      //adding lists

      bricksList=bricksGroup.getChildren();
      mysteryBlocksListCopy = mysteryBlocksList.slice();
      mysteryBlockHitboxList=mysteryBlockHitboxGroup.getChildren();
      stairsList=stairsGroup.getChildren();
      coinsList=coinsGroup.getChildren();
      grassPlatformList=grassPlatformGroup.getChildren();
      stairsList=stairsGroup.getChildren();
      
      for(let x=0; x<coinsList.length; x++)
        {
          coinsList[x].anims.play("coinUp")
        }
      
      for(let i=0; i<bricksList.length; i++)
        {
          colliderGroup.add(bricksList[i])
        }
      for(let i=0; i<mysteryBlocksList.length; i++)
        {
          colliderGroup.add(mysteryBlocksList[i])
        }
      for(let i=0; i<stairsGroup.length; i++)
        {
          colliderGroup.add(stairsGroup[i])
        }
      for(let i=0; i<grassPlatformList.length; i++)
        {
          colliderGroup.add(grassPlatformList[i])
        }
      for(let i=0; i<tubesList.length; i++)
        {
          colliderGroup.add(tubesList[i])
        }

      flag=this.physics.add.image(6800, 450, "flag")
      this.physics.add.image(flag.x+200, 550, "castle").setScale(0.5)

      //add text

      scoreDisplayer=this.add.text(20, 75, "SCORE: 0", {
        fontFamily:"MarioFont", 
        fontSize:30, color:"#FFFFFF"
      })
      scoreDisplayer.setScrollFactor(0);
    }
    update(){
      bg.setTilePosition(this.cameras.main.scrollX);
      playerSpeed=400;
      player.setVelocityX(0);

      //player movement left and right
      if(left.isDown) 
      {
        facingLeft=true;
        facingRight=false;
        if(player.x>0)
        {
          player.setVelocityX(-playerSpeed);
          player.anims.play("runningLeft", true);
          if(this.physics.world.overlap(player,colliderGroup))
          {
            player.setVelocityX(0);
            player.x+=5;
          }
        }
      }
      else if(right.isDown)
      {
        facingLeft=false;
        facingRight=true;
        player.setVelocityX(playerSpeed);
        player.anims.play("runningRight", true); 
        if(this.physics.world.overlap(player,colliderGroup))
        {
          player.setVelocityX(0);
          player.x-=5;
        }
      }

      if(player.body.velocity.x==0 && player.body.velocity.y==0)
        {
          if(facingLeft==true)
          {
            player.setTexture("mario", "runningLeft0000");
          }
          else if(facingRight==true)
          {
            player.setTexture("mario", "runningRight0000");
          }
        }

      if(player.body.velocity.y<0 && player.body.touching.down==false)
      {
        if(facingLeft==true)
          {
            player.setTexture("mario", "jumpingLeft");
          }
          else if(facingRight==true)
          {
            player.setTexture("mario", "jumpingRight");
          }
      }

      if(up.isDown && this.physics.world.overlap(player, ladderGroup))
      {
        player.setVelocityY(-550);
      }

      // player jumps
      
      else if(up.isDown && player.body.touching.down)
      {
        if(this.physics.world.overlap(player,colliderGroup))
        {
          player.setVelocityY(0);
        }
        else
        {
          player.setVelocityY(-850);
          marioJump.play();
        }
      }

      // if the player hits the mystery block

      for(let x=0; x<mysteryBlockHitboxList.length; x++)
        {
          let coin;
          let hitbox=mysteryBlockHitboxList[x];
          let mBlock=mysteryBlocksListCopy[x];
          if(this.physics.world.overlap(player,hitbox))
          {
            player.y+=5;
            coin=this.add.sprite(mysteryBlockHitboxList[x].x, mysteryBlockHitboxList[x].y-57, "coins", "coinsUp0001");
            coin.anims.play("coinUp");
            coinsGroup.add(coin);
            mBlock.setTexture("emptyBlock")
            mysteryBlockHitboxList.splice(x, 1)
            mysteryBlocksListCopy.splice(x, 1)
          }
        }
      this.physics.add.collider(player, mysteryBlocksGroup);

      // if the player collides with a coin
      coinsList=coinsGroup.getChildren();
      for(let i=0; i<coinsList.length; i++)
        {
          let coin=coinsList[i];
          if(this.physics.world.overlap(player,coin))
          {
            coinCollect.play();
            score+=50;
            coin.destroy();
          }
        }

      for(let x=0; x<goombaList.length; x++)
        {
          let enemyNumber=goombaList[x]
          this.physics.add.collider(player, enemyNumber);
          // moving the goomba enemy
          if(enemyNumber.body.velocity.x == 200 || enemyNumber.body.velocity.x == -200)
          {
            enemyNumber.anims.play("goombaRunning", true)  
          }
        
          if(this.physics.world.overlap(enemyNumber, colliderGroup))
          {
            goombaSpeed*=-1;
            goombaSetback*=-1;
            enemyNumber.x+=goombaSetback;
          }
          enemyNumber.setVelocityX(goombaSpeed)
        
          if(player.body.touching.down && enemyNumber.body.touching.up)
          {
            goombaStomp.play();
            enemyNumber.setTexture("goomba", "goombaSquished")
            enemyNumber.destroy();
            score+=100;
          }
        
          else if(this.physics.world.overlap(player, enemyNumber))
          {
            dead();
          }
        
          else if(player.x+28==enemyNumber.x-24)
          {
            dead();
          }
          else if(player.x-28==enemyNumber.x+24)
          {
            dead();
          }
          else if(player.x+28==enemyNumber.x+24)
          {
            dead();
          }
          else if(player.x-28==enemyNumber.x-24)
          {
            dead();
          }
        }
      scoreDisplayer.text="SCORE: " + score;

      //if the player collides with the flag
      try{
        if(this.physics.world.overlap(player, flag))
        {
          level2Scores.push(score);
          level2Scores=bubbleSort(level2Scores);
          level2HighScore=level2Scores[level2Scores.length-1]
  
          player.x+=5000
      
          game.sound.stopAll();
          levelCompleteSound.play();
  
          let startNewLevel=()=>{
            game.scene.start("finalLevel");
            game.scene.stop("level2");
          }
          setTimeout(startNewLevel, 6000)
        }
      }
      catch(err){}
      
      // if player falls through the floor
      if(this.isUnderMap()==true)
      {
        dead();
      }
    }

   addPlatform(x, y)
   {
     grassPlatformGroup.add(this.add.tileSprite(x, y, 330, 60, "grassPlatform"))
   }

   addBrick(x, y)
   {
     let brick=this.add.tileSprite(x, y, 40, 40, "platformBrick")
     bricksGroup.add(brick);
   }
  
   addMysteryBlock(x, y)
   {
     mysteryBlocksGroup.add(this.add.tileSprite(x, y, 40, 40, "mysteryBlock"));
   }
  
   isUnderMap()
   {
     if(player.y>800)
     {
       return true;
     }
     else
     {
       return false;
     }
   }
}//end of levelTwo



var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1200,//game world width
  height: 700,//game world height
  physics: {
      default: 'arcade',
      arcade: {
          debug: false
          }
  }
};

var game = new Phaser.Game(config);

game.scene.add("level1",levelOne);
game.scene.add("level2",levelTwo);
game.scene.add("finalLevel",finalLevel);
game.scene.add("home",mainScreen);
game.scene.add("transition", transition);
game.scene.add("levelSelect", levelSelect)
game.scene.start("home");//the sceen or screen to start