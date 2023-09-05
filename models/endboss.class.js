class Endboss extends MovableObject {
    height = 400;
    width = 400;
    y = 65;
    isDying = false;
    // isHit = false;
    energy = 100;
    offSet = {
        top: 20,
        right: 40,
        bottom: 15,
        left: 100
    }
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ]
    IMAGES_ALERTING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ]
    IMAGES_HURTING = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]
    IMAGES_DYING = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    constructor() {
        super().loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_ALERTING);
        this.loadImages(this.IMAGES_DYING);

        this.x = 2400;
        this.animate();
    }

    animate() {
        let movingEndboss = setInterval(() => {
            this.moveLeft()
        }, 1000 / 100);

        let endbossInterval = setInterval(() => {
            if (!this.isHurt() && !this.isDying) {
                this.playAnimation(this.IMAGES_WALKING)
            } else if (this.isHurt() && !this.isDying) {
                setTimeout(() => {
                    this.playAnimation(this.IMAGES_HURTING);
                }, 100);
            } else if (this.isDying) {
                clearInterval(movingEndboss);
                this.playAnimation(this.IMAGES_DYING);
                this.y += 25;
            } else if (!this.isHurt() && this.isDying) {
                setTimeout(() => {
                    clearInxterval(endbossInterval);
                    console.log('Intervall wird gelöscht');
                }, 3000);
            }
        }, 200);
    }
}