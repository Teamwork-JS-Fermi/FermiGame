	canvas = document.createElement("canvas");
	ctx = this.canvas.getContext("2d");
function main() {
	display = new Screen(650, 600);
	input = new InputHandeler();

	var img = new Image();
	img.addEventListener("load", function() {
		taSprite = new Sprite(this, 0, 0, 50, 26);
		init();
		run();
	});
	img.src = "imgs/tank.png";
};

function init() {
	tank = {
		sprite: taSprite,
		x: (display.width - taSprite.w) / 2,
		y: display.height - (5 + taSprite.h)
	};
	bullets = [];
};

function run() {
	var loop = function() {
		update();
		render();
		window.requestAnimationFrame(loop, display.canvas);
	};
	window.requestAnimationFrame(loop, display.canvas);
};

function update() {
	if (input.isDown(37)) { // Left
		tank.x -= 4;
	}
	if (input.isDown(39)) { // Right
		tank.x += 4;
	}
	tank.x = Math.max(Math.min(tank.x, display.width - (5 + taSprite.w)), 5);

	if (input.isPressed(32)) { 
		bullets.push(new Bullet(tank.x + 25, tank.y, -8, 2, 6, "pink"));
	}

	for (var i = 0, len = bullets.length; i < len; i++) {
		var b = bullets[i];
		b.update();
		if (b.y + b.height < 0 || b.y > display.height) {
			bullets.splice(i, 1);
			i--;
			len--;
			continue;
		}
	}
};

function render() {
	display.clear();
	for (var i = 0, len = bullets.length; i < len; i++) {
		display.drawBullet(bullets[i]);
	}
	display.drawSprite(tank.sprite, tank.x, tank.y);
};

main();