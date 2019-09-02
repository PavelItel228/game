function Border(up, left, down, right, width, height) {
    this.width = 1700;
    this.height = 60;
    this.up = createSprite(this.width, this.height);
    this.down = createSprite(this.width, this.height);
    this.left = createSprite(this.height, this.width);
    this.right = createSprite(this.height, this.width);
    this.up.addImage(up);
    this.down.addImage(down);
    this.left.addImage(left);
    this.right.addImage(right);

    this.up.position = createVector(this.width/2, this.height/2);
    this.left.position = createVector(this.height/2, this.width/2);
    this.down.position = createVector(this.width/2, this.width - this.height/2);
    this.right.position = createVector(this.width - this.height/2, this.width/2);

    let group = new Group();
    group.add(this.left);
    group.add(this.right);
    group.add(this.down);
    group.add(this.up);
    return group;
}