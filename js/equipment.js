class equipment {
  constructor(x,y)
  {
    this.x = x;
    this.y = y;
    this.name = "equipment";
    this.width = 100;
    this.height = 5;
    this.facingAngle = 0;
    this.alive = true;
    this.color = "";
    this.owner = 0;
    
    this.damage = 10;
  }
  

  update() {
    
    this.x = this.owner.x;
    this.y = this.owner.y;
    this.facingAngle = this.owner.lookingDir;
  }
  
  draw() {
    ctx.fillStyle = this.color;
    ctx.translate(this.x - viewX, this.y - viewY);
    ctx.rotate(-this.facingAngle*Math.PI/180);
    //ctx.fillRect(0-this.width/2, 0-this.height/2, this.width, this.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}

