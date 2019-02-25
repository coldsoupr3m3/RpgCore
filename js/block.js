class block {
  constructor() {
    this.name = "block";
    this.x = 0;
    this.y = 0;
    this.width = 40;
    this.height = 40;
    this.targetX = null;
    this.targetY = null;
    this.color = "#B8860B";
    this.alive = true;
  }
  
  update(){
    
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - viewX, this.y - viewY, this.width, this.height);
  }
}