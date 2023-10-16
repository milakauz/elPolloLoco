class Character extends MovableObject {
    width = 150;
    height = 230;
    y = 210;
    world;
    speed = 10;
    lastAction = 0;
    livingInterval;
    sleepingInterval;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURTING = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DYING = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_IDLING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    IMAGES_IDLING_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    offSet = {
        top: 95,
        right: 30,
        bottom: -5,
        left: 30
    }

    constructor() {
        super().loadImage(this.IMAGES_IDLING[0]);
        this.loadImages(this.IMAGES_IDLING);
        this.loadImages(this.IMAGES_IDLING_LONG);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DYING);

        this.animate();
        this.applyGravity();
    }

    jump() {
        this.speedY = 40;
    }


    /**
     * Checking if character is not played for idle animation.
     * @returns {boolean}
     */
    hasNoActions() {
        return !this.world.keyboard.LEFT && !this.world.keyboard.RIGHT && !this.world.keyboard.SPACE && !this.world.keyboard.D;
    }

    /**
     * Animation for short idling.
     */
    isChilling() {
        this.playAnimation(this.IMAGES_IDLING);
        this.lastAction += 100;
    }

    /**
     * Animation for long idling.
     */
    isSleeping() {
        this.playAnimation(this.IMAGES_IDLING_LONG);
        this.lastAction += 100;
    }

    /**
     * Resetting last action for character to be idling again if not played.
     */
    resetLastAction() {
        this.lastAction = 0;
    }

    /**
     * Function for playing audio.
     *
     * @param {*} audio
     */
    playSound(audio) {
        audio.play(audio);
    }

    /**
     * Checking if character is able to be moving right.
     * @param {keyboard_Right, level_end_x}
     * @returns {boolean}
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * Moving character to the right.
     */
    moveRight() {
        character_walking.play();
        super.moveRight();
        this.otherDirection = false;
    }

    /**
     * Checking if character is able to be moving left.
     * @param {keyboard_LEFT, character.x}
     * @returns {boolean}
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * Moving character to the left.
     */
    moveLeft() {
        character_walking.play();
        super.moveLeft();
        this.otherDirection = true;
    }

    /**
     * Checking if character can jump.
     * @param {keyboard_SPACE, !chracter.isAboveGround}
     * @returns {boolean}
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * Checking if character should be walking.
     * @param {keyboard_RIGHT, keyboard_LEFT}
     * @returns {*boolean}
     */
    isWalking() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    /**
     * Setting Interval for moving character.
     */
    setMovingInterval() {
        setInterval(() => {
            if (this.canMoveRight()) {
                this.resetLastAction();
                this.moveRight();
            }
            if (this.canMoveLeft()) {
                this.resetLastAction();
                this.moveLeft();
            }

            if (this.canJump()) {
                this.resetLastAction();
                this.jump();
                this.playSound(character_jumping)
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * Setting Interval for playing animations.
     */
    setLivingInterval() {
        setInterval(() => {
            if (this.isHurt()) {
                setTimeout(() => {
                    this.playAnimation(this.IMAGES_HURTING);
                }, 100);
            } else if (this.isWalking()) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.isDead()) {
                this.playAnimation(this.IMAGES_DYING);
            }
        }, 50);

        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING)
            }
        }, 250);
    }

    /**
     * Checking actions according to last action time for playing idling animation.
     */
    checkActions() {
        setInterval(() => {
            if (this.hasNoActions() && this.lastAction <= 3000)
                this.isChilling();
            if (this.hasNoActions() && this.lastAction >= 3000)
                this.isSleeping();
        }, 200);
    }

    /**
     * Function initiating all intervals for playing animation. 
     */
    animate() {
        this.setMovingInterval();
        this.setLivingInterval();
        this.checkActions();
    }
}
