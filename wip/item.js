class item {
  constructor(){
    this.value; //gold value of the item for selling/buying
    this.sprite = new Image();
    this.sprite.src = "http://mainark.com/content/img/item.png"
    this.x;
    this.y;
  }
  
  draw(x,y){
    ctx.drawImage(this.sprite, x, y);
  }
}