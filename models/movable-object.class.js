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

    /**
     * Function for applying gravity for y coordinates when character is jumping.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

        }, 1000 / 25);
    }

    /**
     * Checking if object is above ground for throwing animation of bottles or jumping animation for character.
     * @date 9/16/2023 - 10:01:33 AM
     *
     * @returns {boolean}
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 210;
        }
    }

    /**
     * Initiating all functions which are checking if character is colliding with chickens, bottles, coins or endboss.
     * @param {*} obj
     * @returns {boolean}
     */
    isColliding(obj) {
        return (
            this.leftColliding(obj) &&
            this.rightColliding(obj) &&
            this.bottomColliding(obj) &&
            this.topColliding(obj)
        );
    }

    /**
     * Checking if this is colliding with object from the bottom.
     * @param {*} obj
     * @returns {boolean}
     */
    bottomColliding(obj) {
        return (
            this.y + this.height - this.offSet.bottom >
            obj.y + obj.offSet.top
        );
    }

    /**
     * Checking if this is colliding with object from the right side.
     * @param {*} obj
     * @returns {boolean}
     */
    rightColliding(obj) {
        return (
            this.x + this.width - this.offSet.right >
            obj.x + obj.offSet.left
        );
    }


    /**
     * Checking if this is colliding with object from the left side.
     * @param {*} obj
     * @returns {boolean}
     */
    leftColliding(obj) {
        return (
            this.x + this.offSet.left <
            obj.x + obj.width - obj.offSet.right
        );
    }

    /**
     * Checking if this is colliding with object from the top side.
     * @param {*} obj
     * @returns {boolean}
     */
    topColliding(obj) {
        return (
            this.y + this.offSet.top <
            obj.y + obj.height - obj.offSet.bottom
        );
    }
    
    /**
     * Function for setting energy after movable object (x) is hit. 
     * @param {*} x
     */
    hit(x) {
        this.energy -= x * 5;
        this.isHurt();
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Storing time stamp of last hit and checking if lastHit was within the last quarter of a second.
     * @date 9/16/2023 - 10:05:53 AM
     *
     * @returns {boolean}
     */
    isHurt() {
        let difference = new Date().getTime() - this.lastHit; // in ms
        difference = difference / 1000; // in s
        return difference < 0.25;
    }



    /**
     * Setting movable object energy to 0.  
     * @returns {boolean}
     */
    isDead() {
        return this.energy == 0;
    }
}