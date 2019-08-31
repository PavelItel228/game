function Tower(img) {
    this.sprite = createSprite(136, 60);
    this.sprite.addImage(img);
    this.sprite.position.x = 0;
    this.sprite.position.y = 0;
    this.draw = function (xCordTank, yCordTank) {
        this.sprite.position.x = xCordTank;
        this.sprite.position.y = yCordTank;
        let x = mouseX - width/2;
        let y = mouseY - height/2;
        let angle = Math.atan(y/x);
        if (x < 0){
            angle += Math.PI
        }
        this.sprite.rotation = angle*180/Math.PI;
    };
    this.setCords = function (x, y, angle) {
        this.sprite.position.x = x;
        this.sprite.position.y = y;
        this.sprite.rotation = angle;
    }
}