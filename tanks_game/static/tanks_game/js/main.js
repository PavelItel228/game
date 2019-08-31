let WIDTH = innerWidth;
let HEIGHT = innerHeight;
let MAP_WIDTH = 1500;
let MAP_HEIGHT = 900;
let myTank, opponentTank;
let border_down_img, border_up_img, border_left_img, border_right_img, tower_img, tank_img, bullet_img;
let date = new Date();
let border; // to check collision with tank
var bullet_arr = [];
var bullet_arr_opponent = [];
var able_to_shot = true;


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
    setupMap(); // create canvas
    setupTanks();
    border = setupBorder();

}

function draw() {
    background(200, 180, 160);
    msPerFrame();
    drawTanks();


    fill(255, 0, 0);
    rect(100, 200, 50, 50);
    rect(200, 300, 50, 50);
    rect(300, 300, 50, 50);
    rect(700, 300, 50, 50);
    rect(300, 567, 50, 50);
    rect(567, 123, 50, 50);

    drawSprites();
    myTank.reload();
}

// ------------------ game play functions -------------------------------------

function msPerFrame() {
    let previous = date.getMilliseconds();
    date = new Date();
    let current = date.getMilliseconds();
    if (current > previous) {
        console.log("msPerFrame: " + (current - previous))
    }
}

function setupMap() {
    createCanvas(WIDTH, HEIGHT);
}

function drawTanks() {
    myTank.move();
    myTank.sprite.collide(border);
    myTank.sprite.collide(opponentTank.sprite);
    data1.setCords(myTank.sprite.position.x, myTank.sprite.position.y, myTank.sprite.rotation, myTank.tower.sprite.rotation,);
    opponentTank.setCords(data2.x, data2.y, data2.angle, data2.towerAngle);
    drawBullets();

}

function setupTanks() {

    myTank = new Tank(400, 400, tank_img, tower_img);
    opponentTank = new Tank(600, 400, tank_img, tower_img);


    camera.position = myTank.sprite.position;
    // camera.zoom = 0.5;
}

function setupBorder() {
    return new Border(border_up_img, border_left_img, border_down_img, border_right_img, MAP_WIDTH, MAP_HEIGHT);
}

function drawBullets() {
    if (mouseIsPressed && able_to_shot) {
        myTank.shot();
        // console.log(bullet_arr);
        myTank.shot_time = new Date().getTime();
        able_to_shot = false;
    }
    if (data2.bullet !== 0){
        bullet_arr_opponent.push(new Bullet(...data2.bullet, bullet_img))
    }

    checkBullet(bullet_arr);
    checkBullet(bullet_arr_opponent);

    function checkBullet(arr){
        for (let i = arr.length - 1; i >= 0; i--) {
            arr[i].move();
            if (arr[i].sprite.position.x < 60 ||
                arr[i].sprite.position.x > 1640 ||
                arr[i].sprite.position.y < 60 ||
                arr[i].sprite.position.y > 1640) {
                arr[i].sprite.remove();
                arr.splice(i, 1);
            }
        }
    }
    // console.log(data2.bullet)
}