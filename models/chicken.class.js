class Chicken extends MovableObject {
    y = 400;
    height = 50;
    width = 50;
    offSet = {
        top: 5,
        right: 5,
        bottom: 0,
        left: 5
    }
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);

        this.x = 250 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate()
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    disappear() {
        let deathInterval = setInterval(() => {
            this.playAnimation(this.IMAGE_DEAD);
            setTimeout(() => {
                clearInterval(deathInterval);
            }, 200);
        }, 1500);
    }
}