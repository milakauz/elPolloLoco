class ThrowableObject extends MovableObject {
    speedY = 30;
    speedX = 20;
    offSet = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
    isSplashed = false;

    IMAGES_ROTATING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASHING = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    ]

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATING);
        this.loadImages(this.IMAGES_SPLASHING);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
        this.animate();
    }

    /**
     * Function for throwing bottles.
     */
    throw() {
        this.applyGravity();
        this.animate();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }


    /**
     * Function for animating thrown bottles.
     */
    animate() {
        setInterval(() => {
            if (!this.isSplashed) {
                this.playAnimation(this.IMAGES_ROTATING);
            } else if (this.isSplashed) {
                this.playAnimation(this.IMAGES_SPLASHING)
            }
        }, 450);
    }
}