var mouseLeftDown = 0;
var mouseLeftUp = 0;
var activelyPlacing = false;
var gridSize = 40;
var posX = 0;
var posY = 0;

//var snapX = Math.floor(mouseX()/gridSize)*gridSize;
//var snapY = Math.floor(mouseY()/gridSize)*gridSize;

var mapEditor = {

  x: null,
  y: null,
  width: 40,
  height: 40,
  targetX: null,
  targetY: null,
  new: true,
  color: "orange",
  alive: true,
  currentMap: "",

  objType: block,

  selectObject: function() {
    var type = document.getElementById("placing").value;
    switch (type) {
      case "enemy":
        this.objType = enemy;
        break;
      case "block":
        this.objType = block;
        break;
      case "startBlock":
        this.objType = startBlock;
        break;
      case "portalOne":
        this.objType = "portalOne";
        break;
      case "trader":
        this.objType = trader;
        break;
      case "eraser":
        this.objType = "eraser";
        break;
      default:
        break;
    }
  },


//
  saveMapToFile: function() {
    this.optimize();

    str = "";
    
    str += startBlock.name + ",";
    str += startBlockOne.x + ",";
    str += startBlockOne.y + ";";
    
    str += endBlockOne.name + ",";
    str += endBlockOne.x + ",";
    str += endBlockOne.y + ";";
    
    /*for (var i = 0; i < blocks.length; i++) {
      current = blocks[i];
      str += current.name + "," + current.x + "," + current.y + ";";
    }*/
    
  for (var i = 0; i < objects.length; i++) {
      for (var j = 0; j < objects[i].length; j++) {
        current = objects[i][j];
        str += current.name + "," + current.x + "," + current.y + ";";
      }
    }


    map.value = str;

  },


//deletes overlapping basic collider blocks
  optimize: function() {
    var blocksToDelete = [];

    for (var i = 0; i < blocks.length; i++) {
      for (var j; j < blocks.length; j++) {
        if (i != j && blocks[i].x == blocks[j].x && blocks[i].y == blocks[j].y){
          blocksToDelete.push(i);
        }
      }
    }

    for (var i = 0; i < blocksToDelete.length; i++) {
      blocks.splice(blocksToDelete[i], 1);
    }


  },

  update: function() {

    if(posX > 0 && posY > 0 && posX < width && posY < height){
      if (mouseLeftDown == 1) {
        snapX = Math.floor((posX + viewX) / gridSize) * gridSize;
        snapY = Math.floor((posY + viewY) / gridSize) * gridSize;
        //console.log(mouseX(),mouseY());
        activelyPlacing = true;
      }

      if (mouseLeftDown === 0 && activelyPlacing === true && gameState == "edit") {
        if (this.objType !== null) {
          switch (document.getElementById("placing").value) {
            case "enemy":
              newObject = new enemy();
              enemies.push(newObject);
              newObject.x = snapX;
              newObject.y = snapY;
              break;
            case "block":
              newObject = new block();
              blocks.push(newObject);
              newObject.x = snapX;
              newObject.y = snapY;
              break;
            case "startBlock":
              startBlockOne.x = snapX;
              startBlockOne.y = snapY;
              break;
            case "portalOne":
              portalOne.x = snapX;
              portalOne.y = snapY;
              break;
            case "trader":
              newObject = new trader();
              traders.push(newObject);
              newObject.x = snapX;
              newObject.y = snapY;
              break;
            case "eraser":
                //Need Halp

              break;
            default:
            break;
          }
          activelyPlacing = false;
        }
      }
    }


  },

  draw: function() {
    if (mouseLeftDown == 1 && posX > 0 && posY > 0 && posX < width && posY < height && gameState == "edit") {
      ctx.fillStyle = this.color;
      //ctx.fillRect(mouseX(), mouseY(), this.width, this.height);
      ctx.fillRect(snapX - viewX, snapY - viewY, this.width, this.height);

    }
  }
}