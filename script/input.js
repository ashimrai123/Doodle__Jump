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