    //constant.js file 
    
    
    const SPEED = 7;
    const JUMP_HEIGHT =11;
    let GRAVITY = 0.3 ; 



    const obstacleWidth = 80;
    const obstacleHeight =20;
    let obstacleCount = 1000;



    let randomIncrementInHeightMax =90;
    let randomIncrementInHeightMin =30;



    let score = 0;

  //input.js file 




const keys = {
    A: false,
    D: false,
    // W: false,
    // S: false,
    // Space: false
};

window.addEventListener('keydown', (e) => {
    e.preventDefault();
    console.log('Keydown:', e.code);

    switch (e.code) {
        case 'KeyA':
            keys.A = true;
            player.direction = 'left';
            break;
        case 'KeyD':
            keys.D = true;
            player.direction = 'right';
            break;
        // case 'KeyS':
        //     keys.S = true;
        //     break;
        // case 'KeyW':
        // case 'Space':
        //     keys.W = true;
        //     break;
    }
});

window.addEventListener('keyup', (e) => {
    e.preventDefault();
    console.log('Keyup:', e.code);

    switch (e.code) {
        case 'KeyA':
            keys.A = false;
            player.direction = 'left';
            break;
        case 'KeyD':
            keys.D = false;
            player.direction = 'right';
            break;
        // case 'KeyS':
        //     keys.S = false;
        //     break;
        // case 'KeyW':
        // case 'Space':
        //     keys.W = false;
        //     break;
    
}
});

// Function to handle mouse movements
function handleMouseMove(e) {
    const mouseX = e.clientX - canvas.getBoundingClientRect().left;

    // Adjust player's x position based on mouse x position
    player.x = mouseX - player.width / 2;

    // Set player direction based on mouse position
    player.direction = mouseX > player.x ? 'right' : 'left';
}

// Add event listener for mouse movements
window.addEventListener('mousemove', handleMouseMove);

// Function to handle device orientation changes (tilt)
function handleTilt(e) {
    const tiltX = e.beta; // Get the tilt around the x-axis (in degrees)

    // Adjust player's x position based on tilt
    player.x = canvas.width / 2 + tiltX * 2; // You may need to adjust the multiplier for sensitivity

    // Set player direction based on tilt
    player.direction = tiltX > 0 ? 'right' : 'left';
}

// Check if the device supports orientation events
if (window.DeviceOrientationEvent) {
    // Add event listener for device orientation changes
    window.addEventListener('deviceorientation', handleTilt);
} else {
    console.log('Device orientation events not supported.');
}


//character.js file


class Character {
    constructor(x, y, width, height, vx, vy) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = "#000";

        this.vx = vx;
        this.vy = vy;

        this.isGrounded = false;
        this.direction = 'right'; // Default direction

        // Load separate images for left and right directions
        this.spriteRight = new Image();
        this.spriteRight.src = './assets/images/right.png';

        this.spriteLeft = new Image();
        this.spriteLeft.src = './assets/images/left.png';
    }

    draw(ctx) {
        // Use the appropriate sprite based on the direction
        const sprite = this.direction === 'right' ? this.spriteRight : this.spriteLeft;

        ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
    }
    }

//     draw(ctx) {
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
    
// }



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
        this.image.src = "./assets/images/obstacle.png";
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



//collision.js file 

function playJumpSound() {
    const jumpSound = new Audio('./assets/sounds/jump.wav');
    jumpSound.play();
}

function checkCollisions(player, obstacles) {
    for (const obstacle of obstacles) {
        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            if (player.y + player.height < obstacle.y + obstacle.height && player.vy >= 0) {
                // Player is above the obstacle
                player.isGrounded = true;
                player.vy = 0;
                player.y = obstacle.y - player.height;


                 // Play the jump sound when colliding with an obstacle
                 playJumpSound();
            }
            
        }
    }
}


//index.js file 

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');


//Background Image
const backgroundImage = new Image();
backgroundImage.src = './assets/images/background.png';

const player = new Character(400, canvas.height - 300, 50, 50, 0, 0);
const obstacles = [];

function gameOver() {
    // Display try again message
    const gameOverMessageTry = `Press any key to try again!`;
    const gameOverMessageScore = `Score: ${score}`;
    // Draw game over message on the canvas
    ctx.font = '30px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText(gameOverMessageTry, canvas.width / 2 - 150, canvas.height / 2);
    ctx.fillText(gameOverMessageScore, canvas.width / 2 - 150, canvas.height / 2 -60);


    // Add an event listener to restart the game on any key press
    window.addEventListener('keydown', restartGame);
}

function restartGame() {
    // Remove the event listener to prevent multiple restarts
    window.removeEventListener('keydown', restartGame);

    // Reset player and obstacle positions
    player.x = 400;
    player.y = canvas.height - 300; // Adjust as needed
    obstacles.length = 1;  // Clear existing obstacles

    // Reset score to zero
    score = 0;

    // Restart obstacle creation
    startObstacleCreation(canvas, obstacles, SPEED);

    // Restart the animation loop
    animate();
}

function animate() {

    //Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Background Image
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Draw the score at the top left
    ctx.font = '20px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText('Score: ' + score, 10, 30);

    for (const obstacle of obstacles) {
        obstacle.draw(ctx);
        obstacle.y += obstacle.vy;

        if (obstacle.y - obstacle.height > canvas.height) {
            obstacles.shift(); // Obstacle gets removed 
            score= score + obstacle.height; // Increment the score when an obstacle is passed
        }
    }

    
    player.draw(ctx); // We draw the player 

    checkCollisions(player, obstacles); // We check for Collisions with Obstacles

    if (player.y + player.height >= canvas.height) {
        // Player has touched the ground
        gameOver();
        return;  // Stop the animation loop
    }

    // Check if the player is near the middle of the canvas
    if (player.y < canvas.height / 2) {
        const scrollAmount = canvas.height / 2 - player.y;
        
        // Move the existing elements (player and obstacles) up
        player.y += scrollAmount;
        for (const obstacle of obstacles) {
            obstacle.y += scrollAmount;
        }
    }

    if (player.x > canvas.width) {
        player.x = 0 - player.width;
    } else if (player.x < 0 - player.width) {
        player.x = canvas.width;
    }

    if (keys.A) {
        player.vx = -SPEED;
    } else if (keys.D) {
        player.vx = SPEED;
    } else {
        player.vx = 0;
    }

    if (player.isGrounded) {
        player.vy = -JUMP_HEIGHT;
        player.isGrounded = false;
    }

    player.vy += GRAVITY;
    player.y += player.vy;

    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.isGrounded = true;
    }

    player.x += player.vx;

    requestAnimationFrame(animate);
}



animate();

startObstacleCreation(canvas, obstacles, SPEED);
