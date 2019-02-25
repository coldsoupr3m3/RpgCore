class container{
  constructor(slots) {
    this.name = "";
    this.slots = slots; //number of slots
    this.items = new Array(this.slots);
    this.open = false;
    this.margin = 20;
    this.slotWidth = 60;
    this.slotsPerRow = 8;
    this.x = this.margin;
    this.y = this.margin;
    this.height = canvas.height - (2 * this.margin);
    this.width = canvas.width - (2 * this.margin);
    this.init();
    this.alive = true;
  }
  
  init(){
    //this may cause a bug where the inventory is purged every time the game loads
    for(var i = 0; i < this.slots; i++){
      this.items[i] = null;
    }
  }
  
  addItem(item, slot){
    if(this.items[slot] === null){
      this.items[slot] = item;
    }
  }
  
  takeItem(slot){
    var returnItem = this.items[slot];
    this.items[slot] = null;
    return returnItem;
  }
  
  update(){
    if(mouseLeftDown && (posX < 20 || posX > canvas.width - 20 || posY < 20 || posY > canvas.height - 20)){
      this.open = false;
    }
    
    if(keyState[keyboard.i] == 1 && this.open === false){
      this.open = true;
    } else if(keyState[keyboard.i] == 1 && this.open === true){
      this.open = false
    }
    
  }
  
  draw(){
    if(this.open == true){
      ctx.fillStyle = "rgba(155,155,155,0.5)";
      ctx.fillRect( this.x, this.y, this.width, this.height);
      ctx.fillStyle = "rgba(0,0,255,0.5)";
      var slotRow = 0;
      for(var i = 0; i < this.slots; i++){
        if(i%this.slotsPerRow == 0){
          slotRow++;
        }
        if(this.items[i] !== null){
          //image drawing goes after this next line:
         ctx.fillRect(this.x + i%this.slotsPerRow * this.slotWidth + i%this.slotsPerRow * this.margin + this.margin, this.y + slotRow*this.slotWidth + slotRow*this.margin + this.margin,this.slotWidth,this.slotWidth);
        }
        ctx.fillRect(this.x + i%this.slotsPerRow * this.slotWidth + i%this.slotsPerRow * this.margin + this.margin, this.y + slotRow*this.slotWidth + slotRow*this.margin + this.margin,this.slotWidth,this.slotWidth);
      }
    }
  }
}