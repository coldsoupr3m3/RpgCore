class trader {
  constructor(){
  this.name = "enemy";
  this.x = null;
  this.y = null;
  this.ySpd = 0;
  this.xSpd = 1;
  this.width = 40;
  this.height = 40;
  this.alive = true;
  this.canJump = 1;
  this.maxHealth = 400;
  this.health = this.maxHealth;
  this.canShoot = true;
  this.state = "idle";
  }
  
 yColReact(obj){
        if (obj.ySpd > 0) { 
          obj.refreshJump();
        }
          obj.ySpd = 0; 
  }
  
  xColReact(obj){
    obj.xSpd *= -1;
  }

  tryJump() {
      if (this.canJump > 0) {
           this.ySpd = -8.5;
           this.canJump -= 1;													
      }
  }

  refreshJump() { 
      this.canJump = 2;
  }
  
  reloadGun() {
    this.canShoot = true;
  }
  
  moveChange() {
  		this.xSpd *= -1;
  }

  update(){
    if(this.health <= 0)
    {
      this.alive = false;
    }
      this.ySpd += gravity;
    
    if(this.state !== "engaged"){
    if (Math.random()< .01) { 
      if(Math.random() < .1){
        this.xSpd = 1;
      } else if(Math.random() < .1){
        this.xSpd = -1;
      } else{
        this.xSpd = 0;
      }
      
    }

    if (Math.random()< .01) { 
      if(Math.random() < .1){
        this.ySpd = 1;
      } else if(Math.random() < .1){
        this.ySpd = -1;
      } else{
        this.ySpd = 0;
      }
      
    }
  }


      
   moveCalculate(this,this.xColReact,this.yColReact);
    
    	if (AABBIntersect(playerOne.x - 130, playerOne.y - 130, playerOne.width + 300 - 40, playerOne.height + 300 - 40, this.x, this.y, this.width, this.height)) {
						this.state = "trading";
            if (AABBIntersect(playerOne.x - 130, playerOne.y - 130, playerOne.width + 300 - 40, playerOne.height + 300 - 40, this.x, this.y, this.width, this.height)) {
            this.state = "trading";
      } 
      } else {
        this.state = "idle";
      }
      
      
  }
  draw() {
      ctx.fillStyle = "blue";
      ctx.fillRect(this.x - viewX, this.y - viewY, this.width, this.height);
      
      if(this.state == "trading"){
        //ctx.fillStyle = "rgba(255,255,255,0.3)";
        //ctx.fillRect(canvas.width / 2 - 150, canvas.height / 2 - 150,300,300);
        
        ctx.fillStyle = "white";
        ctx.font = "normal 19px Arial";
        ctx.fillText("Would you like to trade?",  this.x - viewX - 90, this.y - viewY - 20);

        ctx.fillStyle = "white";
        ctx.font = "normal 19px Arial";
        ctx.fillText("Press E to trade",  playerOne.x - viewX - 70, playerOne.y - viewY - 20);
      }
      
      ctx.fillStyle = "red";
      ctx.fillRect(this.x - viewX, this.y - viewY - 20, this.width, 15);
    
      ctx.fillStyle = "green";
      ctx.fillRect(this.x - viewX, this.y - viewY - 20, (Math.max(this.health,0)*this.width)/this.maxHealth, 15);
  }
}