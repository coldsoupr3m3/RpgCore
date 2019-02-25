/*class character {
  constructor(){
    
    //stats (for super class)
    this.gold = 0; //maybe make gold an item?
    this.exp = 0;
    this.lvl = 1;
    this.nextLvl = 1000;
    this.attack = 1;
    this.defence = 1;
    this.maxHealth = 500;
    this.health = this.maxHealth;
    this.inventory = new container(3);
    
    //totally not stats
    this.name = "player";
    this.x = null;
    this.y = null;
    this.ySpd = 0;
    this.xSpd = 0;
    this.width = 40;
    this.height = 40;
    this.canJump = 0; // was set to 2
    this.keyStatePrev = {};
    this.canShoot = true;
    this.lookingDir = 0;
    
    this.newGun = new equipment();
    equipments.push(this.newGun);
    this.newGun.owner = this;
  }
  
  yColReact(obj){
        if (obj.ySpd > 0) { 
          obj.refreshJump();
        }
          obj.ySpd = 0; 
  }
  
  xColReact(obj){
    obj.xSpd = 0;
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
  

  update() {
    if(this.exp >= this.nextLvl){
      this.nextLvl = this.lvl + this.nextLvl * 1.45;
      this.nextLvl = Math.round(this.nextLvl);
      this.lvl += 1;
    }
    
    
    if (mouseLeftDown == 1 && this.canShoot === true) {
          var newBullet = new bullet(this.x + this.width/2, this.y + this.height/2);
          bullets.push(newBullet);
          newBullet.dir = pointDirection(newBullet.x,newBullet.y,posX+viewX,posY+viewY); //take out viewX?        //Math.atan2(this.y-posY-viewY,-(this.x-posX-viewX))*180/Math.PI//Math.random()*360;
          newBullet.spd = 50;
          newBullet.width = newBullet.spd;
          newBullet.xSpd = xComponentOfVector(newBullet.spd,newBullet.dir);             //Math.cos(newBullet.dir/180*Math.PI)*newBullet.spd;
          newBullet.ySpd = yComponentOfVector(newBullet.spd,newBullet.dir);             //-Math.sin(newBullet.dir/180*Math.PI)*newBullet.spd;
          newBullet.owner = this;
          newBullet.damage = 200;
          this.canShoot = false;
          var thisGuy = this;
          setTimeout(function(){thisGuy.reloadGun()},200);
    }
    
    
    if (keyState[w] && this.keyStatePrev[w] != keyState[w]) {
      this.tryJump();
    }
    this.keyStatePrev[w] = keyState[w];

    //if (keystate[s]) this.y += 7;
    this.xSpd = 0;
    if (keyState[a]) this.xSpd = -7;
    if (keyState[d]) this.xSpd = +7;
    this.ySpd += gravity;
    
   moveCalculate(this,this.xColReact,this.yColReact);
   

    viewX = this.x - width / 2 + this.width / 2;
    this.lookingDir = pointDirection(this.x,this.y,posX+viewX,posY+viewY);
    
    if(this.y > height * 0.9){
    }
  }
  draw() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.x - viewX, this.y - viewY, this.width, this.height);
    
    ctx.fillStyle = "red";
    ctx.fillRect(this.x - viewX, this.y - viewY - 20, this.width, 15);
    
    ctx.fillStyle = "green";
    ctx.fillRect(this.x - viewX, this.y - viewY - 20, (Math.max(this.health,0)*this.width)/this.maxHealth, 15);
  }
}



        /*
        old code
        
        xDiff = Math.abs(this.x - blocks[i].x);
        yDiff = Math.abs(this.y - blocks[i].y);
        minXDiff = this.width / 2 + blocks[i].width / 2;
        minYDiff = this.height / 2 + blocks[i].height / 2;
        //if xdiff<ydiff do vertical one
        if (xDiff < minXDiff || yDiff < minYDiff) {

          if (xDiff > yDiff) {
            this.x = blocks[i].x + minXDiff * Math.sign(this.x - blocks[i].x);
          } else {
            this.y = blocks[i].y + minYDiff * Math.sign(this.y - blocks[i].y);
            if (this.ySpd > 0) {
              this.refreshJump();
            }
            this.ySpd = 0;
          }
        }*/












