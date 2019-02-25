class projectile {
  constructor(x,y)
  {
    this.x = x;
    this.y = y;
    this.name = "bullet";
    this.spd = 605;
    this.width = 30;
    this.height = 2;
    this.dir = 0;
    this.life= 100;
    this.alive = true;
    this.xSpd = this.spd;
    this.ySpd = this.spd;
    this.damage = 10;
    this.color = "white";
  }
  
  yColReact(obj){
    obj.xSpd = 0;
    obj.ySpd = 0;
    obj.spd = 0;
  }
  xColReact(obj){
    obj.xSpd = 0;
    obj.ySpd = 0;
    obj.spd = 0;
  }

  update() {
    //check if hitting enemies
      var wasCollision = false;
      var collisionID = -1;
      for (var i = 0; i < enemies.length; i++) {
        if (this.owner == enemies[i]) {continue;}
        if (collides(this, enemies[i]))  {
         wasCollision = true;
         collisionID = enemies[i];
         break;
        } 
      }

      //check if hitting players
      for (var i = 0; i < players.length; i++) {
        if (this.owner == players[i]) {continue;}
        if (collides(this, players[i]))  {
         wasCollision = true;
         collisionID = players[i];
         break;
        } 
      }
    if (wasCollision === true) {
      this.alive = false;
      collisionID.health -= this.damage;
      if(collisionID.health <= 0 && this.owner.name == "player"){
        this.owner.exp += 50;
        this.owner.gold += Math.round(Math.random() * 50);
      }
    }
    
   //this.ySpd += gravity;
    
   moveCalculate(this,this.xColReact,this.yColReact);
   //moveProjectile(this,this.xColReact,this.yColReact);
   this.life-=1;
   if (this.life<=0) {
     this.alive = false;
   }
  }
  
  draw() {
    if(this.alive == true){
      ctx.fillStyle = this.color;
      ctx.translate(this.x - viewX, this.y - viewY)
      ctx.rotate(-this.dir*Math.PI/180);
      ctx.fillRect(0-this.width/2, 0-this.height/2, this.width, this.height);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
  }
}


