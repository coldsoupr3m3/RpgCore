class endBlock {
  constructor()
  {
	this.target = "cave1";
    this.name = "endBlock";
    this.x = null;
    this.y = null;
    this.width = 40;
    this.height = 40;
    this.alive = true;

  }
  
  update() {
    if (AABBIntersect(playerOne.x, playerOne.y, playerOne.width, playerOne.height, this.x, this.y, this.width, this.height)) {
			 	loadMap(this.target);
      }
      

  }
  draw() {
    ctx.fillStyle = "rgba(0,235,235,0.5)";
    ctx.fillRect(this.x - viewX, this.y - viewY, this.width, this.height);
  }
}