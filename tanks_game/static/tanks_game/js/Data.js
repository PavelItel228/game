function Data(x, y, angle, towerAngle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.towerAngle = towerAngle;

    this.setCords = function(x, y, angle, towerAngle){
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.towerAngle = towerAngle;
    };
    // this.getCords = function () {
    //     return [this.x, this.y]
    // }
    
}