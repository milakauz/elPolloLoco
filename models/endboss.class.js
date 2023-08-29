class Endboss extends MovableObject {
    height = 400;
    width = 400;
    y = 65;
    offSet = {
        top: 20,
        right: 40,
        bottom: -20,
        left: 40
    }
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
        // 'img/4_enemie_boss_chicken/1_walk/G2.png',
        // 'img/4_enemie_boss_chicken/1_walk/G3.png',
        // 'img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.x = 2200;
        this.animate();
    }

    animate() {
        // this.moveLeft();

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}