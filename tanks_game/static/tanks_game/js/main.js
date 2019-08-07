var date = new Date();
var myTank, opponentTank;
var bullets_arr = [];
var op_bullets_arr = [];
var border_down_img, border_up_img, border_left_img, border_right_img, tower_img, tank_img, bullet_img;
var borders, border_group;
var isCollide;

var able_to_shot = true;
var width, height;
var xBias, yBias;

function preload() {
    //----------- loading textures--------------------
    border_down_img = loadImage("https://i.ibb.co/TqSs4Rv/down.png");
    border_up_img = loadImage("https://i.ibb.co/mXxmqwG/up.png");
    border_left_img = loadImage("https://i.ibb.co/W5cGnJ5/left.png");
    border_right_img = loadImage("https://i.ibb.co/1R8tMWP/right.png");
    tower_img = loadImage("https://i.ibb.co/9NBp0dj/tower3.png");
    tank_img = loadImage("https://i.ibb.co/gWzvtCp/tank-body.png");
    bullet_img = loadImage("https://i.ibb.co/rZgDdy9/Untitled.png");
}

function setup() {
    let mapHeight = 1500;
    let mapWidth = 900;
    width = innerWidth;
    height = innerHeight;
    [xBias, yBias] = getTranslationConfiguration(mapWidth, mapHeight, width, height);
    createCanvas(width, height);
    myTank = new Tank(0, 0, [100, 255, 100], tower_img, tank_img);
    opponentTank = new Tank(0, 0, [255, 100, 100], tower_img, tank_img);
    borders = new createBorderBox(border_left_img, border_right_img, border_up_img, border_down_img);
    border_group = borders.group();
}

function draw() {
    background(180, 160, 120);

    // msPerFrame();
    drawTanks();
    drawBullets();
    // console.log(xBias, yBias);
    borders.drawBorderBox();
    drawSprites();
    myTank.reload();
    // console.log(bullets_arr)

}


function msPerFrame() {
    let previous = date.getMilliseconds();
    date = new Date();
    let current = date.getMilliseconds();
    if (current > previous) {
        console.log("msPerFrame: " + (current - previous))
    }
}

function drawTanks() {
    myTank.move();
    isCollide = false;
    myTank.sprite.collide(border_group, myTank.collision);
    // myTank.sprite.collide(opponentTank.sprite);
    data1.setCords(-myTank.translation.x, -myTank.translation.y, myTank.rotationAngle, myTank.tower.rotationAngle);
    opponentTank.sprite.position.x = width / 2 + data2.x;
    opponentTank.sprite.position.y = height / 2 + data2.y;
    opponentTank.rotationAngle = data2.angle;
    opponentTank.sprite.rotation = data2.angle;
    opponentTank.tower.rotationAngle = data2.towerAngle;
    opponentTank.tower.sprite.rotation = data2.towerAngle;
    opponentTank.tower.sprite.position.x = width / 2 + data2.x;
    opponentTank.tower.sprite.position.y = height / 2 + data2.y;

}

function drawBullets() {
    if (mouseIsPressed && able_to_shot) {
        myTank.shot();

        myTank.shot_time = new Date().getTime();
        able_to_shot = false;
    }
    for (let i = bullets_arr.length - 1; i >= 0; i--) {
        bullets_arr[i].move();
        if (opponentTank.sprite.overlapPoint(bullets_arr[i].sprite.position.x, bullets_arr[i].sprite.position.y)){
            console.log("Opponent tank was hit!");
            bullets_arr[i].sprite.remove();
            bullets_arr.splice(i, 1);
            continue;
        }
        if (bullets_arr[i].sprite.position.x < 60 ||
            bullets_arr[i].sprite.position.x > 1640 ||
            bullets_arr[i].sprite.position.y < 60 ||
            bullets_arr[i].sprite.position.y > 1640) {
            bullets_arr[i].sprite.remove();
            bullets_arr.splice(i, 1);
        }
    }
    if (data2.bullet !== 0) {
        // console.log(data2.bullet);
        let bullet = new Bullet(...data2.bullet);
        op_bullets_arr.push(bullet);
    }
    for (let i = op_bullets_arr.length - 1; i >= 0; i--) {
        op_bullets_arr[i].move();
        if (myTank.sprite.overlapPoint(op_bullets_arr[i].sprite.position.x, op_bullets_arr[i].sprite.position.y)){
            console.log("Your tank was hit!");
            op_bullets_arr[i].sprite.remove();
            op_bullets_arr.splice(i, 1);
            continue;
        }
        if (op_bullets_arr[i].sprite.position.x < 60 ||
            op_bullets_arr[i].sprite.position.x > 1640 ||
            op_bullets_arr[i].sprite.position.y < 60 ||
            op_bullets_arr[i].sprite.position.y > 1640) {
            op_bullets_arr[i].sprite.remove();
            op_bullets_arr.splice(i, 1);

        }
    }
}
function getTranslationConfiguration(mapWidth, mapHeight, screenWidth, screenHeight) {
    let x, y;
    x = (mapWidth - screenWidth)/2;
    y = (mapHeight - screenHeight)/2;
    return [x, y];
}
