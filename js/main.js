   /*
    *~~~~~~~~~~~GOALS~~~~~~~~~~~~~
    *  1. gravity ***DONE***
    *  2. collision with blocks ***DONE***
    *  3. load and save for maps ***DONE***
    */
    
    //ERRORS
    //1. Projectile stuff.
    //2. container showing/hiding with keypress. ***DONE***
    canvas = document.getElementById("myCanvas");

    var ctx = canvas.getContext("2d");

    var map = document.getElementById("mapCode");

    var width = canvas.width;
    var height = canvas.height;
    var pi = Math.PI;

    var viewX = 0,
      viewY = 0;

    var fps = 60;

    var KEY_UP = 87,
    KEY_DOWN = 83,
    KEY_LEFT = 65,
    KEY_RIGHT = 68,
    KEY_ACTION_ONE = 90;

    var w = 87,
      a = 65,
      s = 83,
      d = 68,
      e = 101,
      k = 107;
    var keyboard = {
      w: 87,
      a: 65,
      s: 83,
      d: 68,
      i: 73,
      e: 101,
      q: 113
    }
    var gold = 0;

    var gravity = 0.0;  //was set to 0.3

    //pure math utility functions
    var AABBIntersect = function(ax, ay, aw, ah, bx, by, bw, bh) {
      return ax < bx + bw && ay < by + bh && bx < ax + aw && by < ay + ah;
    };
    var pointDistance = function(ax, ay, bx, by) {
      return Math.sqrt(Math.pow(ax-bx,2)+Math.pow(ay-by,2));
    };
    var pointDirection = function(ax, ay, bx, by) {
      return Math.atan2(ay-by,-(ax-bx))*180/Math.PI;
    };
    var xComponentOfVector = function(length,dir) {
      return Math.cos(dir/180*Math.PI)*length;
    };
    var yComponentOfVector = function(length,dir) {
      return -Math.sin(dir/180*Math.PI)*length;
    };
    
    var gameState = "play";

    var enemies = [];
    
    var players = [];
    
    var equipments = [];
    
    var containers = [];
    
    var playerOne = new player();
    
    players.push(playerOne);
    
    var testContainer = new container(22);
    
    containers.push(testContainer);
    //portals
    
    var portalOne = new endBlock();
    	portalOne.target = "cave1";
    var endBlockOne = new endBlock();
    var startBlockOne = new startBlock();

    var blocks = [];
    
    var bullets = [];

    var traders = [];

    var objects = [traders, blocks, enemies, bullets, players, equipments, containers];

    var keyState = [];

    var xDiff = 0;
    var yDiff = 0;
    
    var minXDiff = 0;
    var minYDiff = 0;
    
    function collidesNext(obj1, obj1x,obj1y, obj2){
      return AABBIntersect(obj1x, obj1y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height);
    }
    
    function collides(obj1, obj2){
      return AABBIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height);
    }
    
    function moveProjectile(obj, xfunc, yfunc) {
      
      //check for collision innacurately
      var wasCollision = false;
      var collisionID = -1;
      for (var i = 0; i < blocks.length; i++) {
        if (collidesNext(obj, obj.x + obj.xSpd, obj.y + obj.ySpd, blocks[i]))  {
          wasCollision = true;
          collisionID = blocks[i];
          break;
        } 
      }
      
      //if didn't collide innacurately, move normally
      if (wasCollision === false) {
        obj.x += obj.xSpd;
        obj.y += obj.ySpd;
      }
      
      //if did collide innacurately, move precisely
      if (wasCollision === true) {
        var normalX = obj.xSpd / obj.spd;
        var normalY = obj.ySpd / obj.spd;
        var spdCopy = obj.spd;
        for (var i = 0; i < spdCopy; i++) {
          if (collidesNext(obj, obj.x + obj.normalX, obj.y + obj.normalY, collisionID)) { 
            //then 1 more pixel would put us in the block so
            break;
          }
          else
          {
            obj.x += obj.normalX;
            obj.y += obj.normalY;
          }
        }
        yfunc(obj);
      }  
    }
    
    
    
    
    function moveCalculate(obj, xfunc, yfunc) {
      
      //check for collision horizontally, if empty then move. If collision found, move precisely.
      var wasCollision = false;
      var collisionID = -1;
      for (var i = 0; i < blocks.length; i++) {
        if (collidesNext(obj, obj.x + obj.xSpd, obj.y, blocks[i]))  {
         wasCollision = true;
         collisionID = blocks[i];
         break;
        } 
      }
      //if no collision, move normally
      if (wasCollision === false) {
          obj.x += obj.xSpd;
      }
      //if horizontal collison, stop moving 
      if (wasCollision === true) {
        obj.x = Math.round(obj.x);//new comment
        for (var i = 0; i < Math.abs(obj.xSpd); i++) {
          if (collidesNext(obj, obj.x + Math.sign(obj.xSpd), obj.y, collisionID)) { 
            //then 1 more pixel would put us in the block so
            break;
          }
          else
          {
            obj.x += Math.sign(obj.xSpd);
          }
        }
        xfunc(obj);
        //obj.xSpd = 0;
      }
      
      //check for collision vertically, if empty then move. If collision found, move precisely.
      wasCollision = false;
      collisionID = -1;
      for (var i = 0; i < blocks.length; i++) {
        if (collidesNext(obj, obj.x, obj.y + obj.ySpd, blocks[i]))  {
          wasCollision = true;
          collisionID = blocks[i];
          break;
        } 
      }
      if (wasCollision === false) {
        obj.y += obj.ySpd;
      } 
      if (wasCollision === true) {
        obj.y = Math.round(obj.y);//new comment
        for (var i = 0; i < Math.abs(obj.ySpd); i++) {
          if (collidesNext(obj, obj.x, obj.y + Math.sign(obj.ySpd), collisionID)) { 
            //then 1 more pixel would put us in the block so
            break;
          }
          else
          {
            obj.y += Math.sign(obj.ySpd);
          }
        }
        yfunc(obj);
      }  
    }




    function spawnEnemy(amount) {
      for (var i = 0; i < amount; i++) {
        var newEnemy = new enemy();
        enemies.push(newEnemy);
        newEnemy.x = Math.random() * width - newEnemy.width;
        newEnemy.y = Math.random() * height - newEnemy.height;
      }
    }

    function spawnBlocks(amount) {
      for (var i = 0; i < amount; i++) {
        newBlock = new block();
        blocks.push(newBlock);
        newBlock.x = Math.random() * width - newBlock.width;
        newBlock.y = Math.random() * height - newBlock.height;
      }

      //blocks.push(Object.create(block));

    }
    
    function spawnGroundBlock() {
        newBlock = new block();
        blocks.push(newBlock);
        newBlock.x = -10000;
        newBlock.y = height;
        newBlock.width = 20000;
        newBlock.height = 100;
    }

    function checkInput() {
      document.addEventListener("keydown", function(evt){
        if (keyState[evt.keyCode] != 2) {
          keyState[evt.keyCode] = 1;//just pressed
        } else if(keyState[evt.keyCode] == 1){
          keyState[evt.keyCode] = 2;
        }
                console.log(evt.keyCode + "         Pressed           " + keyState[evt.keyCode])

      });
      document.addEventListener("keyup", function(evt) {
        keyState[evt.keyCode] = 0;
                console.log(evt.keyCode + "        Released          "  + keyState[evt.keyCode])

      });
    }
function main() {
  init();
  setInterval(loop, 1000 / fps);
}

function loop() {
  
  update();
  draw();
  
  for(var i = 0; i < keyState.length; i++){
    if (keyState[i] == 1) {
      keyState[i] = 2;//been pressed for a while
    } 
  }
  

}

function init() {
  startBlockOne.x = (width - player.width) / 2;
  startBlockOne.y = (height - player.height) / 2;
  endBlockOne.x = (width - player.width) + 80;
  endBlockOne.y = (height - player.height);
  loadMap("startTown");
  Object.create(mapEditor);
  for(var i = 0; i < 200; i++){
    keyState[i] = 0; //initialize
  }
  checkInput();
}

function update() {
  
  if(collides(endBlockOne,playerOne)){
    loadNextMap();
  }
  
  if (Math.random() > .2 && enemies.length < 5) {
    //spawnEnemy(2);
    //spawnBlocks(50);
  }
  
  for(var i = 0; i < objects.length; i++){
    for(var j = 0; j < objects[i].length; j++){
    if (objects[i][j].alive === false) {
        objects[i].splice(j, 1);
      } else if (objects[i][j]) {
        objects[i][j].update();
      }
    }
  }
  
  endBlockOne.update();
  //objects = [blocks,enemies,bullets];
  mapEditor.update();
}

function draw() {
  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.fillRect(0, 0, width, height);
  startBlockOne.draw();
  endBlockOne.draw();
  playerOne.draw();
  mapEditor.draw();
  for(var i = 0; i < objects.length; i++){
    for(var j = 0; j < objects[i].length; j++){
      objects[i][j].draw();
    }
  }
  
  

  
    ctx.fillStyle = "white";
    ctx.font = "normal 19px Arial";
    ctx.fillText("Gold: " + playerOne.gold, 10, 30);
    ctx.fillText("Lvl: " + playerOne.lvl, 10, 80);
    ctx.fillText("Exp: " + playerOne.exp, 100, 30);
    ctx.fillText("Next Level: " + playerOne.nextLvl, 200, 30);


  ctx.restore();
}
    
main();

    
   // var imageObj = new Image();
     //   imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/wood-pattern.png';
   // var pattern = ctx.createPattern(imageObj, 'repeat');
      
