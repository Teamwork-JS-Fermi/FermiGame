var canvas=document.getElementById("canvas");
var ctx=canvas.getContext('2d');

var enemy= new Animation(23.3,14,0,0,6,'sprites/enemy.png',1,0,0);

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

