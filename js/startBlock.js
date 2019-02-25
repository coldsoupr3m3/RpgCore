class startBlock {
  constructor(){
  this.name = "startBlock";
  this.x = null;
  this.y = null;
  this.alive = true;
  }
  draw() {
    ctx.fillStyle = "rgba(255,235,0,0.5)";
    ctx.fillRect(this.x - viewX, this.y - viewY, 40, 40);
  }
}