function Tank(x, y, col, tower_img, tank_img) {
    this.sprite = createSprite(160, 120);
    // this.sprite.shapeColor = color(...col);
    this.sprite.addImage(tank_img);
    this.sprite.position.x = 300;
    this.sprite.position.y = 300;
    this.speed = 4;
    this.translation = createVector(0, 0);
    this.rotationSpeed = 2;
    this.rotationAngle = 0;
    this.isCollide = false;
    this.tower = new Tower(tower_img);
    this.xxx = 0;
    this.shot_time = 0;
    this.shooting_speed = 200; // milliseconds per shot
    this.sendCords = function () {
        if (chatSocket.readyState === 1) {
            chatSocket.send(JSON.stringify({
                'message': [data1.x, data1.y, data1.angle, data1.towerAngle, 0]
            }));
        }
    };

    this.move = function () {
        if (keyIsDown(87) && !isCollide) {
            this.translation.x -= this.speed * Math.cos(this.rotationAngle / 180 * Math.PI);
            this.translation.y -= this.speed * Math.sin(this.rotationAngle / 180 * Math.PI);
            // console.log(this.isCollide);
            this.sendCords();

        }
        if (keyIsDown(83) && !isCollide) {
            this.translation.x += this.speed * Math.cos(this.rotationAngle / 180 * Math.PI);
            this.translation.y += this.speed * Math.sin(this.rotationAngle / 180 * Math.PI);
            this.sendCords();

        }
        if (keyIsDown(65)) {
            this.sprite.rotation -= this.rotationSpeed;
            this.rotationAngle -= this.rotationSpeed;
            this.sendCords();

        }
        if (keyIsDown(68)) {
            this.sprite.rotation += this.   rotationSpeed;
            this.rotationAngle += this.rotationSpeed;
            this.sendCords();
        }
        if (mouseX !== this.xxx) {
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
    };
    this.shot = function () {
        let bullet = new Bullet(this.tower.rotationAngle,
            this.tower.sprite.position.x + 65 * Math.cos(this.tower.rotationAngle / 180 * Math.PI),
            this.tower.sprite.position.y + 65 * Math.sin(this.tower.rotationAngle / 180 * Math.PI))
        bullets_arr.push(bullet);
        if (chatSocket.readyState === 1) {
            chatSocket.send(JSON.stringify({
                'message': [data1.x, data1.y, data1.angle, data1.towerAngle, bullet.getCords()]
            }));
        }

    };
    this.reload = function () {
        let time = new Date().getTime() - this.shot_time;
        if (time >= this.shooting_speed) {
            able_to_shot = true;
        }
        push();
        noStroke();
        let x = width - 100 - this.translation.x;
        let y = height - 100 - this.translation.y;
        if (time < this.shooting_speed) {
            fill(255, 0, 0, 90);
            arc(x, y, 100, 100, -PI / 2,
                time / this.shooting_speed * 2 * PI - PI / 2);
            textSize(25);
            textAlign(CENTER, CENTER);
            fill(0);
            let content = (time/1000).toString().slice(0, 3);
            text(content, x, y)
        } else {
            fill(0, 255, 0, 90);
            ellipse(x, y, 100, 100);
            textSize(30);
            textAlign(CENTER, CENTER);
            fill(255, 0, 0);
            text("Fire!", x, y)
        }
        pop();
    }
}