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
        this.spriteRight.src = '../assets/images/right.png';

        this.spriteLeft = new Image();
        this.spriteLeft.src = '../assets/images/left.png';
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
