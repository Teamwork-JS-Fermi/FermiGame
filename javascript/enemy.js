var canvas=document.getElementById("canvas");
var ctx=canvas.getContext('2d');
var pos={left:false,right:true,bottom:false};
    var enemy= new Animation(23.3,14,0,0,6,'sprites/enemy.png',1,0,0);

    function update(){
       enemyGo();
        checkPosition();
        tick();
        render(ctx);
        requestAnimationFrame(update);
    }
    function tick(){
        enemy.update();
    }
    function render(ctx){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        enemy.draw(ctx);
    }
    function checkPosition(){
        if(enemy.position.x>=canvas.width-23.3){
            pos.right=false;
            pos.left=true;
            enemyGo();
        }
        if(enemy.position.x<=1.5){
            pos.left=false;
            pos.right=true;
            enemyGo();
        }
    }
    function enemyGo(){
        if(pos.left){
            enemy.position.set(enemy.position.x-1.5,enemy.position.y+0);

        }
        if(pos.right){
            enemy.position.set(enemy.position.x+1.5,enemy.position.y+0);

        }
        if(pos.bottom){
            enemy.position.set(enemy.position.x,enemy.position.y+0.5);

        }
    }
    update();


