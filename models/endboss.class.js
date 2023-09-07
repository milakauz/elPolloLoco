class Endboss extends MovableObject {
    height = 400;
    width = 400;
    y = 65;
    speed = 0.8;
    isDying = false;
    hadFirstContact = false;
    hadFirstContactOver = false;
    energy = 100;
    offSet = {
        top: 20,
        right: 40,
        bottom: 15,
        left: 100
    }
    IMAGES_ATTACKING = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ]
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
        super().loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_ALERTING);
        this.loadImages(this.IMAGES_DYING);

        this.x = 2400;
        this.animate();
        // this.playFightingMusic();
    }

    animate() {
        let movingEndboss = setInterval(() => {
            if (this.hadFirstContact) {
                this.moveLeft()
            }
        }, 1000 / 100);

        let endbossInterval = setInterval(() => {
            if (this.hadFirstContact && !this.hadFirstContactOver) {
                this.playAnimation(this.IMAGES_ATTACKING);
                setTimeout(() => {
                    this.hadFirstContactOver = true;
                }, 2000);
            } else if (!this.isHurt() && !this.isDying) {
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
                }, 3000);
            }
        }, 200);
    }
}