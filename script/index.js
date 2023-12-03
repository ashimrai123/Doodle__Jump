//index.js file 

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');


//Background Image
const backgroundImage = new Image();
backgroundImage.src = '../assets/images/background.png';

const player = new Character(400, canvas.height - 300, 50, 50, 0, 0);
const obstacles = [];

function gameOver() {
    // Display try again message
    const gameOverMessage = 'Press any key to try again!';

    // Draw game over message on the canvas
    ctx.font = '30px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText(gameOverMessage, canvas.width / 2 - 150, canvas.height / 2);

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
