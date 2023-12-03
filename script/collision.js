//collision.js file 

function playJumpSound() {
    const jumpSound = new Audio('../assets/sounds/jump.wav');
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
