class MovableObject extends drawableObject {
    speed = 0.15;
    speedY = 0;
    acceleration = 3.5;
    otherDirection = false;
    energy = 100;
    lastHit = 0;

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
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
            return this.y < 200;
        }
    }

    isColliding(obj) {
        return (
            this.leftColliding(obj) &&
            this.rightColliding(obj) &&
            this.bottomColliding(obj) &&
            this.topColliding(obj)
        );
    }

    // bottom edge of this is bigger than upper edge of obj
    bottomColliding(obj) {
        return (
            this.y + this.height - this.offSet.bottom >
            obj.y + obj.offSet.top
        );
    }

    // right corner of this is bigger than left corner of obj
    rightColliding(obj) {
        return (
            this.x + this.width - this.offSet.right >
            obj.x + obj.offSet.left
        );
    }

    // left corner of this is smaller than right corner of obj
    leftColliding(obj) {
        return (
            this.x + this.offSet.left <
            obj.x + obj.width - obj.offSet.right
        );
    }

    // upper edge of this is smaller than lower edge of obj
    topColliding(obj) {
        return (
            this.y + this.offSet.top <
            obj.y + obj.height - obj.offSet.bottom
        );
    }

    // endboss soll langsamer Energie verlieren als Character, deswegen x
    hit(x) {
        this.energy -= x * 5;
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