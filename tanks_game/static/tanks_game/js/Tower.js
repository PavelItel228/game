function Tower(img) {
    this.img = img;
    this.sprite = createSprite(136, 60);
    this.sprite.addImage(this.img);
    this.sprite.position.x = width/2;
    this.sprite.position.y = height/2;
    this.rotationAngle = 0;
    this.draw = function (xcord, ycord) {
        this.sprite.position.x = xcord;
        this.sprite.position.y = ycord;
        this.sprite.rotation = this.rotationAngle;
        let x = mouseX - width/2;
        let y = mouseY - height/2;
        let angle = Math.atan(y/x);
        if (x < 0){
            angle += Math.PI
        }
        this.rotationAngle = angle*180/Math.PI;
    };

}