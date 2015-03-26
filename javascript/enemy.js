//var goingDown=0;
//var enemy = new Animation(23.3,14,0,0,6,'sprites/enemy.png',1,0,0);
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext('2d');
var changingHeight = 0;
var changingWidth = 0;

var goingDownArray = {};
var posArray = {};
var enemyArray = {};

for(var i = 1; i <= 40; i++) {
    goingDownArray[i] = 0;
    posArray[i] = {left: false, right: true, bottom: false};
    enemyArray[i] = new Animation(23.3, 14, 0, 0, 6, 'sprites/enemy.png', 1, 0, 0);
    enemyArray[i].position.x=changingWidth;
    enemyArray[i].position.y=changingHeight;
    changingWidth += 23.3;
    if(i == 8 || i == 16 || i == 24 || i == 32) {
        changingWidth = 0;
        changingHeight += 14;
    }
}

    function update(){
        enemyGo();
        checkPosition();
        tick();
        render(ctx);
        requestAnimationFrame(update);
    }
    function tick(){
        for(var i = 1; i <= 40; i++) {
            enemyArray[i].update();
        }
    }
    function render(ctx){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for(var i = 1; i <= 40; i++) {
            enemyArray[i].draw(ctx);
        }
    }
    function checkPosition(){
        for(var i = 1; i <= 40; i++) {
            if (enemyArray[i].position.x >= canvas.width - 23.3) {
                goingDownArray[i] += 1;
                posArray[i].right = false;
                posArray[i].left = true;
                enemyGo();
            }
            if (enemyArray[i].position.x <= 1.5 && posArray[i].left == true) {
                goingDownArray[i] += 2;
                posArray[i].left = false;
                posArray[i].right = true;
                posArray[i].bottom = true;
                enemyGo();
            }
            if (goingDownArray[i] % 2 == 0 && goingDownArray[i] != 0) {
                goingDownArray[i] = 0;
                enemyArray[i].position.y + 2;
            }
        }
    }
    function enemyGo(){
        for(var i = 1; i <= 40; i++) {
            if (posArray[i].left) {
                enemyArray[i].position.set(enemyArray[i].position.x - 0.5, enemyArray[i].position.y + 0);
            }
            if (posArray[i].right) {
                enemyArray[i].position.set(enemyArray[i].position.x + 0.5, enemyArray[i].position.y + 0);
            }
            if (posArray[i].bottom) {
                enemyArray[i].position.set(enemyArray[i].position.x, enemyArray[i].position.y + 5);
                posArray[i].bottom = false;
            }
        }
    }
    update();



