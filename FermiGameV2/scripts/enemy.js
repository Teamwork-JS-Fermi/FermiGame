(function () {

    var numEnemies = 20,
        score = 0,
        enemies = [],
        canvas;

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

    function destroyCoin (enemy) {
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
            width: 200, // NEDKOOO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            height: 64, // NEDKOOO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            image: enemyImg,
            numberOfFrames: 2, // NEDKOOO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            ticksPerFrame: i
        });

        enemies[enemyIndex].x = Math.random() * (canvas.width - enemies[enemyIndex].getFrameWidth() * enemies[enemyIndex].scaleRatio);
        enemies[enemyIndex].y = Math.random() * (canvas.height - enemies[enemyIndex].height * enemies[enemyIndex].scaleRatio);
        enemies[enemyIndex].scaleRatio = Math.random() * 0.5 + 0.5;

        // Load sprite sheet
        enemyImg.src = "enemy1.png"; // NEDKOOO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //enemyImg.src = "../sprites/enemy2.png"; //
        //enemyImg.src = "enemy2.png";
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

            score += parseInt(enemyToDestroy[i].scaleRatio * 10, 10);
            destroyCoin(enemyToDestroy[i]);
            setTimeout(spawnEnemy, 1000);
        }
        if (enemyToDestroy.length) {
            document.getElementById("score").innerHTML = score;
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
} ());

