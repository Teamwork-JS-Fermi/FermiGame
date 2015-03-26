var canvas=document.getElementById("canvas");
var ctx=canvas.getContext('2d');

var enemy= new Animation(30,19,0,0,4,'sprites/enemy.png',6,1,1);

function update(){
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
    update();