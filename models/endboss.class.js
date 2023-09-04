class Endboss extends MovableObject {
    height = 400;
    width = 400;
    y = 65;
    isDead = false;
    // isHit = false;
    energy = 100;
    offSet = {
        top: 20,
        right: 40,
        bottom: 15,
        left: 100
    }
    hitting_sound = new Audio('audio/hit_endboss.mp3');
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
        // 'img/4_enemie_boss_chicken/1_walk/G2.png',
        // 'img/4_enemie_boss_chicken/1_walk/G3.png',
        // 'img/4_enemie_boss_chicken/1_walk/G4.png'
    ]
    IMAGES_HURTING = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]

    constructor() {
        super().loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_ALERTING);

        this.x = 2400;
        this.animate();
    }

    animate() {
        let movingEndboss = setInterval(() => {
            this.moveLeft()
        }, 1000 / 100);

        setInterval(() => {
            if (!this.isHurt()) {
                this.playAnimation(this.IMAGES_WALKING)
            } else if (this.isHurt()) {
                setTimeout(() => {
                    this.playAnimation(this.IMAGES_HURTING);
                }, 500);
            }
        }, 200);
    }


    checkEndbossEnergy() {
        console.log(this.energy);
    }
}