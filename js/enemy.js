class enemy {
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
    
    if (Math.random()< .01) { 
      if(Math.random() < .3){
        this.xSpd = 1;
      } else if(Math.random() < .3){
        this.xSpd = -1;
      } else{
        this.xSpd = 0;
      }
      
    }
      
   moveCalculate(this,this.xColReact,this.yColReact);
    
    	if (AABBIntersect(playerOne.x, playerOne.y, playerOne.width, playerOne.height, this.x, this.y, this.width, this.height)) {
						this.alive = false;
						playerOne.health -= 50;
      }
      
      if (this.canShoot === true) {
        var newBullet = new bullet(this.x + this.width/2, this.y + this.height/2);
        bullets.push(newBullet);
        newBullet.dir = Math.random()*40 - 20 + pointDirection(newBullet.x,newBullet.y,playerOne.x+playerOne.width/2,playerOne.y+playerOne.height/2); //take out viewX?        //Math.atan2(this.y-posY-viewY,-(this.x-posX-viewX))*180/Math.PI//Math.random()*360;
        newBullet.spd = 10;
        newBullet.xSpd = xComponentOfVector(newBullet.spd,newBullet.dir);             //Math.cos(newBullet.dir/180*Math.PI)*newBullet.spd;
        newBullet.ySpd = yComponentOfVector(newBullet.spd,newBullet.dir);             //-Math.sin(newBullet.dir/180*Math.PI)*newBullet.spd;
        newBullet.owner = this;
        newBullet.damage = 5;
        newBullet.color = "red";
        this.canShoot = false;
        var thisGuy = this;
        setTimeout(function(){thisGuy.reloadGun()},700);
    }
      
  }
  draw() {
      ctx.fillStyle = "red";
      ctx.fillRect(this.x - viewX, this.y - viewY, this.width, this.height);
      
      ctx.fillStyle = "red";
      ctx.fillRect(this.x - viewX, this.y - viewY - 20, this.width, 15);
    
      ctx.fillStyle = "green";
      ctx.fillRect(this.x - viewX, this.y - viewY - 20, (Math.max(this.health,0)*this.width)/this.maxHealth, 15);
  }
}