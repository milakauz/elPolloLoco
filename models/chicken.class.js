class Chicken extends MovableObject {
    y = 360;
    height = 80;
    width = 80;
    offSet = {
        top: 5,
        right: 35,
        bottom: 0,
        left: 35
    }
    energy = 1;
    isDead = false;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGE_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);

        this.x = 400 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate()
    }

    /**
     * Animation intervals for moving and dying chicken.
     */
    animate() {
        let movingChicken = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                clearInterval(movingChicken)
                this.playAnimation(this.IMAGE_DEAD);
            }
        }, 200);
    }

    /**
     * Setting variable isDead to true. Chicken is removed from Map afterwards.
     */
    dies() {
        if (!this.isDead) {
            this.isDead = true;
            this.currentImage = 0;
        }
    }
}