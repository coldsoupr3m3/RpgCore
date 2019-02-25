document.addEventListener("mousedown", function(e) {
  if (e.which == 1) {
    mouseLeftDown = 1;
    //console.log("left down");
  } else if (e.which == 2) {
    //console.log("middle down");
  } else if (e.which == 3) {
    //console.log("right down");
  }
});

document.addEventListener("mouseup", function(e) {
  if (e.which == 1) {
    mouseLeftDown = 0;
    //console.log("left up");
  } else if (e.which == 2) {
    //console.log("middle up");
  } else if (e.which == 3) {
    //console.log("right up");
  }
});

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

window.addEventListener('mousemove', drawrr, false);

function drawrr(e) {
  var pos = getMousePos(document.getElementById("myCanvas"), e);
  posX = pos.x;
  posY = pos.y;
}

window.onkeydown = function(e) {
  if (e.keyCode == 13) {
    //console.log("Enter Pressed");
    mapEditor.saveMapToFile();
}
}

  function loadMap(mapName) {


/*          SHOW LOADING SCREEN
* 
*
*       
*
*
*
*
*
*
*/





    blocks.splice(0,blocks.length);  
    enemies.splice(0,enemies.length);
    //spawnGroundBlock();
    mapEditor.currentMap = mapName;
    str = maps[mapName];
    objectStrings = str.split(";");
    for (var i = 0; i < objectStrings.length; i++) {
      newObjectString = objectStrings[i].split(",");
      switch (newObjectString[0]) {
        case "enemy":
          var newObject = new enemy();
          enemies.push(newObject);
          newObject.x = parseFloat(newObjectString[1]);
          newObject.y = parseFloat(newObjectString[2]);
          break;
        case "block":
          newObject = new block();
          blocks.push(newObject);
          newObject.x = parseFloat(newObjectString[1]);
          newObject.y = parseFloat(newObjectString[2]);
          break;
        case "startBlock":
          startBlockOne.x = parseFloat(newObjectString[1]);
          startBlockOne.y = parseFloat(newObjectString[2]);
          playerOne.x = parseFloat(newObjectString[1]);
          playerOne.y = parseFloat(newObjectString[2]);
          break;
        case "endBlock":
          endBlockOne.x = parseFloat(newObjectString[1]);
          endBlockOne.y = parseFloat(newObjectString[2]);
          break;
        default:
          break;
      }
    }
  }
  

  //Old endBlock functionality
   function loadNextMap(){
    switch(mapEditor.currentMap){
      case "cave1": loadMap("cave2"); break;
      case "cave2": loadMap("cave3"); break;
      case "cave3": loadMap("cave4"); break;
      case "cave4": loadMap("cave5"); break;
      case "cave3": loadMap("empty"); break;
      default: break;
    }
  }


  //New endblock functionality
  function loadAMap(){
    var mapName = document.getElementById("mapSelector").value;
    switch(mapName){
      case "cave1": loadMap("cave1"); break;
      case "cave2": loadMap("cave2"); break;
      case "cave3": loadMap("cave3"); break;
      case "cave4": loadMap("cave4"); break;
      case "cave3": loadMap("empty"); break;
      default: break;
    }
  }
  
  function alarm(func, ms){
    setTimeout(function(){func()},ms);
  }