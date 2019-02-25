class bullet extends projectile {

  constructor(x,y){
    super(x,y);
  }
  
  yColReact(obj){
    //obj.alive = false;
    obj.spd = 0;
    obj.xSpd = 0;
    obj.ySpd = 0;
  }
  
  xColReact(obj){
    obj.spd = 0;
    obj.xSpd = 0;
    obj.ySpd = 0;
  }
  
}

