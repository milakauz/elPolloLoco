class ThrowableObject extends MovableObject {
    speedY = 30;
    speedX = 20;

    IMAGES_ROTATING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATING);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
        this.animate();
    }

    throw() {
        this.applyGravity();
        setInterval(() => {
            this.animate();
            this.x += 10;
        }, 25);
    }

    animate() {
        console.log('Hi, animate() wird aufgerufen');
        //von wo?
        this.playAnimation(this.IMAGES_ROTATING);
    }
}