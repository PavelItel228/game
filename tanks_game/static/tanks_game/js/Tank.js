function Tank(x, y, col, tower_img, tank_img) {
    this.sprite = createSprite(160, 120);
    // this.sprite.shapeColor = color(...col);
    this.sprite.addImage(tank_img);
    this.sprite.position.x = width/2;
    this.sprite.position.y = height/2;
    this.speed = 4;
    this.translation = createVector(0, 0);
    this.rotationSpeed = 2;
    this.rotationAngle = 0;
    this.isCollide = false;
    this.tower = new Tower(tower_img);
    this.xxx = 0;
    this.sendCords = function () {
        chatSocket.send(JSON.stringify({
            'message': [data1.x, data1.y, data1.angle, data1.towerAngle]
        }));
    };

    this.move = function () {
        if (keyIsDown(87) && !isCollide){
            this.translation.x -= this.speed*Math.cos(this.rotationAngle/180*Math.PI);
            this.translation.y -= this.speed*Math.sin(this.rotationAngle/180*Math.PI);
            console.log(this.isCollide);
            this.sendCords();

        }
        if (keyIsDown(83) && !isCollide){
            this.translation.x += this.speed*Math.cos(this.rotationAngle/180*Math.PI);
            this.translation.y += this.speed*Math.sin(this.rotationAngle/180*Math.PI);
            this.sendCords();

        }
        if (keyIsDown(65)){
            this.sprite.rotation -= this.rotationSpeed;
            this.rotationAngle -= this.rotationSpeed;
            this.sendCords();

        }
        if (keyIsDown(68)){
            this.sprite.rotation += this.rotationSpeed;
            this.rotationAngle += this.rotationSpeed;
            this.sendCords();
        }
        if (mouseX !== this.xxx){
            this.sendCords();
        }
        translate(this.translation.x, this.translation.y);
        this.sprite.position.x = width / 2 - this.translation.x;
        this.sprite.position.y = height / 2 - this.translation.y;
        this.tower.draw(this.sprite.position.x, this.sprite.position.y)

    };
    this.collision = function () {
        console.log("collide");
        isCollide = true;
    }
}