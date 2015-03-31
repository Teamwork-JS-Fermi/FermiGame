    var numEnemies = 9,
        score = 0,
        enemies = [],
        canvas,
		count = 60,
		t = null,
		timespan,
        player;
		window.onload = init;

    function beginGame() {
        document.getElementById('game-field').style.display = 'flex';
        document.getElementById('players').style.display = 'none';
        player = document.getElementById('player').value;
        if (player == '') {
            player = 'Player';
        }
    }

function gameupdate () { 
    function gameLoop () {
        var i;
        window.requestAnimationFrame(gameLoop);
        // Clear the canvas
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

        for (i = 0; i < enemies.length; i += 1) {
            enemies[i].update();
            enemies[i].render();
        }
    }

    function sprite (options) {
        var that = {},
            frameIndex = 0,
            tickCount = 0,
            ticksPerFrame = options.ticksPerFrame || 0,
            numberOfFrames = options.numberOfFrames || 1;

        that.context = options.context;
        that.width = options.width;
        that.height = options.height;
        that.x = 0;
        that.y = 0;
        that.image = options.image;
        that.scaleRatio = 1;
		
        that.update = function () {
            tickCount += 1;
            if (tickCount > ticksPerFrame) {
                tickCount = 0;
                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };

        that.render = function () {
            // Draw the animation
            that.context.drawImage(
                that.image,
                frameIndex * that.width / numberOfFrames,
                0,
                that.width / numberOfFrames,
                that.height,
                that.x,
                that.y,
                that.width / numberOfFrames * that.scaleRatio,
                that.height * that.scaleRatio);
        };
        that.getFrameWidth = function () {
            return that.width / numberOfFrames;
        };
        return that;
    }

    function destroyEnemy (enemy) {
        var i;
        for (i = 0; i < enemies.length; i += 1) {
            if (enemies[i] === enemy) {
                enemies[i] = null;
                enemies.splice(i, 1);
                break;
            }
        }
    }

    function spawnEnemy () {
        var enemyIndex,
            enemyImg;

        // Create sprite sheet
        enemyImg = new Image();
        enemyIndex = enemies.length;


        // Create sprite
        enemies[enemyIndex] = sprite({
            context: canvas.getContext("2d"),
            
        //Window size
            width: 200, 
            height: 64, 
            image: enemyImg,
            numberOfFrames: 2, 
            ticksPerFrame: i
        });

        function smallEnemies (sc, x, y) {
	        	if(score>=sc){
	            enemies[enemyIndex].x = Math.random() * (canvas.width - enemies[enemyIndex].getFrameWidth() * enemies[enemyIndex].scaleRatio);
	            enemies[enemyIndex].y = Math.random() * ((canvas.height) - enemies[enemyIndex].height * enemies[enemyIndex].scaleRatio);
	            enemies[enemyIndex].scaleRatio = Math.random() * x + y;
	        }
        }
        smallEnemies(0,0.45,0.45);
        smallEnemies(100,0.35,0.35);
        smallEnemies(200,0.30,0.30);
        smallEnemies(300,0.25,0.25);
        smallEnemies(400,0.20,0.20);
        smallEnemies(500,0.19,0.19);
        smallEnemies(600,0.185,0.185);
        smallEnemies(700,0.18,0.18);
        smallEnemies(800,0.175,0.175);
        smallEnemies(900,0.17,0.17);
        smallEnemies(1000,0.16,0.16);
        smallEnemies(1100,0.15,0.15);


        function bigEnemies (sc1, sc2, x,y, ct) {
			if (score>sc1 & score<sc2) {
			enemies[enemyIndex].x = Math.random() * (canvas.width - enemies[enemyIndex].getFrameWidth() * enemies[enemyIndex].scaleRatio);
			enemies[enemyIndex].y = Math.random() * ((canvas.height) - enemies[enemyIndex].height * enemies[enemyIndex].scaleRatio);
			enemies[enemyIndex].scaleRatio = Math.random() * x + y;
			count+=ct;
			}
        }
        bigEnemies(250, 257,1.9,1.9,15);
        bigEnemies(400, 407,1.9,1.9,15);
        bigEnemies(540, 547,1.9,1.9,15);
        bigEnemies(660, 667,1.9,1.9,15);
        bigEnemies(780, 790,1.9,1.9,20);
        bigEnemies(940, 950,1.9,1.9,20);
        bigEnemies(1090, 1100,1.9,1.9,20);
        bigEnemies(1250, 1260,1.9,1.9,20);

        enemyImg.src = "sprites/enemy1.png";
        //enemyImg.src = "sprites/enemy2.png";
    }

    function getElementPosition (element) {
        var parentOffset,
            pos = {
                x: element.offsetLeft,
                y: element.offsetTop
            };
        if (element.offsetParent) {
            parentOffset = getElementPosition(element.offsetParent);
            pos.x += parentOffset.x;
            pos.y += parentOffset.y;
        }
        return pos;
    }

    function distance (p1, p2) {
        var dx = p1.x - p2.x,
            dy = p1.y - p2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function tap (e) {
        var i,
            loc = {},
            dist,
            enemyToDestroy = [];
        pos = getElementPosition(canvas),
            tapX = e.targetTouches ? e.targetTouches[0].pageX : e.pageX,
            tapY = e.targetTouches ? e.targetTouches[0].pageY : e.pageY,
            canvasScaleRatio = canvas.width / canvas.offsetWidth;
        loc.x = (tapX - pos.x) * canvasScaleRatio;
        loc.y = (tapY - pos.y) * canvasScaleRatio;
        for (i = 0; i < enemies.length; i += 1) {
            // Distance between tap and enemy
            dist = distance({
                x: (enemies[i].x + enemies[i].getFrameWidth() / 2 * enemies[i].scaleRatio),
                y: (enemies[i].y + enemies[i].getFrameWidth() / 2 * enemies[i].scaleRatio)
            }, {
                x: loc.x,
                y: loc.y
            });
            // Check for tap collision with enemy
            if (dist < enemies[i].getFrameWidth() / 2 * enemies[i].scaleRatio) {
                enemyToDestroy.push(enemies[i]);
            }
        }
        // Destroy tapped enemies
        for (i = 0; i < enemyToDestroy.length; i += 1) {
            count+=5;
            score += parseInt(enemyToDestroy[i].scaleRatio * 10, 10);
            destroyEnemy(enemyToDestroy[i]);
            setTimeout(spawnEnemy, 4000);
        }
        if (enemyToDestroy.length) {
            document.getElementById("score").innerHTML = "Score:"+score;
        }
    }

    // Get canvas
    canvas = document.getElementById("canvas");
    canvas.width = 650;
    canvas.height = 600;

    for (i = 0; i < numEnemies; i += 1) {
        spawnEnemy();
    }

    gameLoop();
    canvas.addEventListener("touchstart", tap);
    canvas.addEventListener("mousedown", tap);
}
gameupdate(); 


function init(){
 timespan = document.getElementById('timespan');
 document.getElementById('btnStart').onclick = start;
 cddisplay();
}

function cddisplay() {
  timespan.innerHTML = "Time Left: " + count;
}
   
function start(){ // starts countdown
  if (t==null && count>0){
    timespan.style.color = 'red';
    countdown();
  }
}

    function countdown() {
        cddisplay();
        if (count == 0) {
            timespan.style.color = 'white';
            //scoreList();
            playerName = document.getElementById('player').value;
            alert('\nGame over, ' + playerName + '\nScore: ' + score);
            document.getElementById("score").innerHTML = 'Score:' + 0;
            score = 0;
            count = 60;
            t = null;
            init();

        }else{
            count--;
            t = setTimeout("countdown()", 100);
        }
    }