function Data(x, y, angle, towerAngle, bullet) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.towerAngle = towerAngle;
    this.bullet = bullet;
    // this.towerAngle = towerAngle;
    // this.bullet = bullet;
    this.setCords = function (x, y, angle, towerAngle, bullet) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.towerAngle = towerAngle;
        this.bullet = bullet;


    }
}