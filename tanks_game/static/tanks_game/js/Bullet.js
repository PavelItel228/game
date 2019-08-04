function Bullet(angle, x, y) {
    this.sprite = createSprite(14, 7);
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.sprite.addImage(bullet_img);
    this.sprite.rotation = angle;
    this.angle = angle;
    this.speed = 15;


    this.move = function () {
        this.sprite.position.x += this.speed*Math.cos(this.angle/180*Math.PI);
        this.sprite.position.y += this.speed*Math.sin(this.angle/180*Math.PI);

    };
    this.getCords = function () {
        return [this.angle, this.sprite.position.x, this.sprite.position.y]
    }
}