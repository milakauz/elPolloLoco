class MovableObject extends drawableObject {
    speed = 0.15;
    speedY = 0;
    acceleration = 2.5;
    otherDirection = false;
    energy = 100;
    lastHit = 0;

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'black';
            ctx.rect(this.x + this.offSet.left, this.y + this.offSet.top, this.width - this.offSet.right - this.offSet.left, this.height - this.offSet.top - this.offSet.bottom);
            ctx.stroke();
        }
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 25;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 157.5;
        }
    }

    isColliding(obj) {
        // x- Achse: rechts oben ist kleiner als links oben && links oben ist kleiner als rechts oben
        return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
        // y-Achse von rechts
            (this.y + this.offSet.right + this.height) >= obj.y &&
        // y-Achse von links
            (this.y + this.offSet.left) <= (obj.y + obj.height);
    }

    // bottomColliding(obj) {
    //     this.y + this.offSet.top > obj.y + obj.width;
    //     console.log('character trifft huhn oben!');
    // }


    hit() {
        this.energy -= 5;
        this.isHurt();
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let difference = new Date().getTime() - this.lastHit; // in ms
        difference = difference / 1000; // in s
        return difference < 0.25;
    }

    isDead() {
        return this.energy == 0;
    }

}