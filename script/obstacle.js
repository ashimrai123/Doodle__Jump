//obstacle.js file 

class Obstacle {
    constructor(x, y, width, height, vx, vy) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.vx = vx;
        this.vy = vy;
        this.image = new Image();
        this.image.src = "../assets/images/obstacle.png";
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

//CREATE OBSTACLE
function createObstacle(canvas, obstacles, SPEED, gapHeight) {
    const obstacle = new Obstacle(
        Math.random() * (canvas.width - obstacleWidth), canvas.height - 100, obstacleWidth, obstacleHeight, 0, 0
    );

    // Adjust the gap between obstacles
    obstacle.y -= gapHeight;

    obstacles.push(obstacle);
}



// TIMING OF OBSTACLES
function startObstacleCreation(canvas, obstacles, SPEED) {

    const firstObstacle = new Obstacle(
        400, canvas.height-100, obstacleWidth, obstacleHeight, 0, 0
    );

    obstacles.push(firstObstacle);


    let gapHeight = 100; // Reset gapHeight to its initial value

for(let i=0;i<obstacleCount;i++){
    createObstacle(canvas,obstacles,SPEED,gapHeight)
    let randomIncrementInHeight = Math.random() * (randomIncrementInHeightMax - randomIncrementInHeightMin) + randomIncrementInHeightMin;
    gapHeight += randomIncrementInHeight;
    
}

}



