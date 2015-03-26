//var goingDown=0;
//var enemy = new Animation(23.3,14,0,0,6,'sprites/enemy.png',1,0,0);
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext('2d');
var changingHeight = 20;
var changingWidth = 0;

var goingDownArray = {};
var posArray = {};
var enemyArray = {};

for(var i = 1; i <= 40; i++) {
    goingDownArray[i] = 0;
    posArray[i] = {left: false, right: true, bottom: false};
    if(i<=16){
        enemyArray[i] = new Animation(23.3, 14, 0, 0, 2, 'sprites/invadersNowfirst.png', 1, 1, 0);
    }
    else{
        if(i<=32&&i>16){
            enemyArray[i] = new Animation(23.3, 14, 0, 0, 2, 'sprites/invadersNowsecond.png', 1, 1, 0);
        }
        else if(i>32){
            enemyArray[i] = new Animation(23.3, 14, 0, 0, 2, 'sprites/invadersNowthird.png', 1, 1, 0);

        }
    }




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
                for(var j = 1; j <= 40; j++) {
                    goingDownArray[j] += 2;
                    posArray[j].right = false;
                    posArray[j].left = true;
                    posArray[j].bottom = true;
                }
                enemyGo();
            }
            if (enemyArray[i].position.x <= 1.5 && posArray[i].left == true) {
                for(var j = 1; j <= 40; j++) {
                    goingDownArray[j] += 2;
                    posArray[j].left = false;
                    posArray[j].right = true;
                    posArray[j].bottom = true;
                }
                enemyGo();
            }
            if (goingDownArray[i] % 2 == 0 && goingDownArray[i] != 0) {
                for(var j = 1; j <= 40; j++) {
                    goingDownArray[j] = 0;
                    enemyArray[j].position.y + 2;
                }
            }
            if(enemyArray[i].position.y<=canvas.height-23.3){
                //score-- or Game Over
                //TO DO
            }
        }
    }
    function enemyGo(){
        for(var i = 1; i <= 40; i++) {
            if (posArray[i].left == true) {
                enemyArray[i].position.x -= 0.5;
                //enemyArray[i].position.set(enemyArray[i].position.x - 0.5, enemyArray[i].position.y + 0);
            }
            if (posArray[i].right == true) {
                enemyArray[i].position.x += 0.5;
                //enemyArray[i].position.set(enemyArray[i].position.x + 0.5, enemyArray[i].position.y + 0);
            }
            if (posArray[i].bottom == true) {
                enemyArray[i].position.y += 5;
                //enemyArray[i].position.set(enemyArray[i].position.x, enemyArray[i].position.y + 5);
                posArray[i].bottom = false;
            }
        }
    }
    function enemyShooting(){
        //  1  2  3  4  5  6  7  8
        //  9 10 11 12 13 14 15 16
        // 17 18 19 20 21 22 23 24
        // 25 26 27 28 29 30 31 32
        // 33 34 35 36 37 38 39 40
        for(var i=33;i<=40;i++){
            if(!enemyArray[i]){
                if(!enemyArray[i-8]){
                    if(!enemyArray[i-16]){
                        if(!enemyArray[i-24]){
                            if(enemyArray[i-32]){
                                //shoot
                            }
                        }
                        else{
                            //shoot
                        }
                    }
                    else{
                        //shoot
                    }
                }
                else{
                    //shoot
                }
            }
        }

    }
    update();



