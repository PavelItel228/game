function Tank(x, y, tank_image, tower_img) {
    this.sprite = createSprite(140, 110);
    this.sprite.addImage(tank_image);
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.sprite.velocity = createVector(0, 0);
    this.tower = new Tower(tower_img);
    this.shot_time = 0;
    this.abs_velocity = 0;
    // tank's constants
    this.SHOOTING_SPEED = 500;
    this.SPEED = 3;
    this.ACCELERATION = 0.2;
    this.ROTATION_SPEED = 2;
    this.MAX_SPEED = 3;



    this.sendCords = function () {
        // console.log(typeof chatSocket);
        if (chatSocket.readyState === 1) {
            // console.log(data1.towerAngle);
            chatSocket.send(JSON.stringify({
                'message': [data1.x, data1.y, data1.angle, data1.towerAngle, 0]
            }));
        }
    };

    this.move = function () {
        this.sprite.velocity = createVector(0, 0);
        this.tower.draw(this.sprite.position.x, this.sprite.position.y);
        this.sendCords();
        // this.abs_velocity = (this.sprite.velocity.x**2 + this.sprite.velocity.y**2)**0.5;
        if (keyIsDown(87)) {
            let x = Math.cos(this.sprite.rotation / 180 * Math.PI) * this.SPEED;
            let y = Math.sin(this.sprite.rotation / 180 * Math.PI) * this.SPEED;
            this.sprite.velocity.x = x;
            this.sprite.velocity.y = y;
            // if (this.abs_velocity < this.MAX_SPEED) {
            //     // this.abs_velocity = (this.sprite.velocity.x**2 + this.sprite.velocity.y**2)**0.5;
            //     let angle = this.sprite.rotation / 180 * Math.PI;
            //     this.sprite.velocity.x += Math.cos(angle) * this.ACCELERATION;
            //     this.sprite.velocity.y += Math.sin(angle) * this.ACCELERATION;
            // }
                    }
        if (keyIsDown(83)) {
            let x = Math.cos(this.sprite.rotation / 180 * Math.PI) * this.SPEED;
            let y = Math.sin(this.sprite.rotation / 180 * Math.PI) * this.SPEED;
            this.sprite.velocity.x = -x;
            this.sprite.velocity.y = -y;
        }
        if (keyIsDown(65)) {
            this.sprite.rotation -= this.ROTATION_SPEED;
            // let angle = this.sprite.rotation / 180 * Math.PI;
            // this.sprite.velocity.x = this.abs_velocity*Math.cos(angle);
            // this.sprite.velocity.y = this.abs_velocity*Math.sin(angle);
        }

        if (keyIsDown(68)) {
            this.sprite.rotation += this.ROTATION_SPEED;
            // let angle = this.sprite.rotation / 180 * Math.PI;
            // this.sprite.velocity.x = this.abs_velocity*Math.cos(angle);
            // this.sprite.velocity.y = this.abs_velocity*Math.sin(angle);
        }
    };
    this.shot = function () {
        let bullet = new Bullet(this.tower.sprite.rotation,
            this.tower.sprite.position.x + 65 * Math.cos(this.tower.sprite.rotation / 180 * Math.PI),
            this.tower.sprite.position.y + 65 * Math.sin(this.tower.sprite.rotation / 180 * Math.PI),
            bullet_img);
        bullet_arr.push(bullet);
        if (chatSocket.readyState === 1) {
            chatSocket.send(JSON.stringify({
                'message': [data1.x, data1.y, data1.angle, data1.towerAngle, bullet.getCords()]
            }));
        }

    };
    this.setCords = function (x, y, angle) {
        this.sprite.position.x = x;
        this.sprite.position.y = y;
        this.sprite.rotation = angle;
        this.tower.setCords(x, y, data2.towerAngle)
    };
    this.reload = function () {
        let time = new Date().getTime() - this.shot_time;
        if (time >= this.SHOOTING_SPEED) {
            able_to_shot = true;
        }
        push();
        noStroke();
        let x = this.sprite.position.x + WIDTH/2 - 100;
        let y = this.sprite.position.y + HEIGHT/2 - 100;
        if (time < this.SHOOTING_SPEED) {
            fill(255, 0, 0, 90);
            arc(x, y, 100, 100, -PI / 2,
                time / this.SHOOTING_SPEED * 2 * PI - PI / 2);
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
            fill(0, 0, 0);
            text("Fire!", x, y)
        }
        pop();
    }
}