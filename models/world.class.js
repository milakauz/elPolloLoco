class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    camera_x = 0;
    healthBar = new HealthBar();
    coinsBar = new CoinBar();
    bottlesBar = new BottleBar();
    endbossEnergyBar = new EnergyBar();
    throwableObjects = [];
    checkAllCollisions;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Sets the world reference for the character.
     * Assigns the current instance to the 'world' property of the 'character'.
     * @this {Object} The instance which the method is called upon.
     */
    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0); // backwards
        this.addToMap(this.healthBar);
        this.addToMap(this.coinsBar);
        this.addToMap(this.bottlesBar);
        if (this.character.x > 1700) {
            this.addToMap(this.endbossEnergyBar);
        }
        this.ctx.translate(this.camera_x, 0); //forwards
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Initiates a series of checking collision.
     * 
     * This method sets an interval to continuously check various conditions such as collisions 
     * and interactions within the game or environment. Each check is executed every 100 milliseconds.
     */
    run() {
        this.checkAllCollisions = setInterval(() => {
            this.checkCollisions();
            this.checkFirstContact();
            this.checkThrowObjects();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkBottleEnemyCollisions();
            this.initiateSound();
        }, 50);
    }


    /**
     * Function for checking first contact between character and endboss.
     */
    checkFirstContact() {
        if (this.character.x > 1930 && !this.level.endboss[0].hadFirstContact) {
            this.level.endboss[0].hadFirstContact = true;
        }
    }

    /**
     * Checking keyboard if character should throw object (bottles). 
     * @date 9/16/2023 - 10:14:25 AM
     */
    checkThrowObjects() {
        if (this.keyboard.D) {
            if (this.checkBottlesToThrow()) {
                this.throwBottle();
                this.character.resetLastAction();
                this.removeBottleFromCollection();
            }
        }
    }

    /**
     * Checking if character has already been collecting bootles.
     * @returns {boolean}
     */
    checkBottlesToThrow() {
        if (this.bottlesBar.collectedBottles === 0) {
            return false;
        } else {
            return true;
        }
    }

    throwBottle() {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, true);
        this.throwableObjects.push(bottle);
    }


    /**
     * Removing bottle from collection so it can't be thrown again.
     * Updating bottlesBar.
     */
    removeBottleFromCollection() {
        this.bottlesBar.collectedBottles--;
        this.bottlesBar.updateBar();
    }

    /**
     * Checking if chicklens and endboss are colliding with character. For either setting the characters energy, 
     * removing chicken from map or hurting/removing endboss.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            this.checkCharacterEnergy(this.character.energy);
            this.checkIfCharacterIsHurt(enemy);
            this.checkIfEnemyIsHurt(enemy);
        });
        this.checkCollisionsWithEndboss();
    }

    checkIfCharacterIsHurt(enemy) {
        if (this.character.isColliding(enemy) && !this.character.isAboveGround() && enemy.energy > 0) {
            this.character.hit(1);
            this.healthBar.setPercentage(this.character.energy)
        }
    }

    checkIfEnemyIsHurt(enemy) {
        if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
            enemy.dies();
            enemy.energy--;
            this.checkIfEnemyIsDead(enemy)
        }
    }

    checkIfEnemyIsDead(enemy) {
        if (enemy.energy === 0) {
            this.removeEnemyfromMap(enemy);
        }
    }

    checkCollisionsWithEndboss() {
        if (this.character.isColliding(this.level.endboss[0]) && this.level.endboss[0].energy > 0) {
            this.character.hit(2);
            this.healthBar.setPercentage(this.character.energy);
        }
    }

    /**
     * Checking the character energy to check if it's dead to show endscreen and removing all objects from map.
     * @param {*} energy
     */
    checkCharacterEnergy(energy) {
        if (energy == 0) {
            this.character.isDead();
            this.removeAllFromMap();
            showEndScreen('PC');
        }
    }

    /**
     * Removing all objects from map when game is over.
     */
    removeAllFromMap() {
        setTimeout(() => {
            clearInterval(this.checkAllCollisions);
            this.level.enemies = [];
            this.level.coins = [];
            this.level.bottles = [];
            this.character = [];
        }, 1000);
    }

    /**
     * Checkking collisions between endboss and bottles for animation and sound of endboss and bottles.
     */
    checkBottleEnemyCollisions() {
        this.throwableObjects.forEach((bottle) => {
            this.level.endboss.forEach((endboss) => {
                if (bottle.isColliding(endboss) && !endboss.isDying && !bottle.isSplashed) {
                    this.bottleSplashingActions(bottle);
                    this.endbossHittingActions(endboss);
                } else if (bottle.isColliding(endboss) && endboss.energy == 0) {
                    this.endbossDyingActions(endboss);
                }
            });
        });
    }


    /**
     * Function for sequences when bottle is splashing like sound and deleting bottle from array of throwable Objects.
     * @param {*} bottle
     */
    bottleSplashingActions(bottle) {
        this.playSound(bottle_splashing);
        bottle.isSplashed = true;
        setTimeout(() => {
            this.deleteBottleFromArray(this.throwableObjects.indexOf(bottle));
        }, 500);
    }

    /**
     * Function for sequences when endboss is been hit like playing sound and setting the energy bar.
     * @param {*} endboss
     */
    endbossHittingActions(endboss) {
        endboss.hit(4);
        this.endbossEnergyBar.setPercentage(endboss.energy)
        this.playSound(endboss_hitting);
    }

    /**
     * Function for sequences when endboss is dying like removing endboss from Map.
     * @param {*} endboss
     */
    endbossDyingActions(endboss) {
        endboss.isDead();
        endboss.isDying = true;
        this.removeEndbossFromMap(endboss);
    }


    /**
     * Function for removing chickens from map.
     * @param {*} obj
     */
    removeEnemyfromMap(obj) {
        setTimeout(() => {
            this.level.enemies.splice(this.level.enemies.indexOf(obj), 1);
        }, 1000);
    }

    /**
     * Function for removing endboss from map.
     * @param {*} endboss
     */
    removeEndbossFromMap(endboss) {
        setTimeout(() => {
            this.level.endboss.splice(this.level.endboss.indexOf(endboss), 1);
            clearInterval(this.checkAllCollisions);
            showEndScreen('NPC');
        }, 3200);
    }


    /**
     * Deleting bottle from array of throwable Objects.
     * @param {*} b
     */
    deleteBottleFromArray(b) {
        this.throwableObjects.splice(this.throwableObjects.indexOf(b), 1);
    }


    /**
     * Checking collisions between character and coins. So that coins can be removed from map and added to statusbar.
     */
    checkCoinCollisions() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                this.removeCoinOffMap(i);
                this.addCoinToStatusbar();
                this.playSound(coin_collecting);
            }
        });
    }

    /**
     * Checking collisions between character and bottles. Bottles are removed from map, added to statusbar.
     */
    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, i) => {
            if (this.character.isColliding(bottle)) {
                this.removeBottleOffMap(i);
                this.addBottleToStatusbar();
                this.playSound(bottle_collecting);
            }
        });
    }


    /**
     * Coin is beeing removed from array so it's not any longer drawn on the map.
     * @param {*} i
     */
    removeCoinOffMap(i) {
        this.level.coins.splice(i, 1);
    }

    /**
     * Adding coin to statusbar.
     */
    addCoinToStatusbar() {
        this.coinsBar.collectedCoins++;
        this.coinsBar.updateBar();
    }

    /**
     * Bottle is beeing removed from array so it's not any longer drawn on the map.
     * @param {*} i
     */
    removeBottleOffMap(i) {
        this.level.bottles.splice(i, 1);
    }

    /**
     * Adding bottle to statusbar so player can see how many bottles they have collected.
     */
    addBottleToStatusbar() {
        this.bottlesBar.collectedBottles++;
        this.bottlesBar.updateBar();
    }

    /**
     * Function for playing sound.
     *
     * @param {*} audio
     */
    playSound(audio) {
        audio.play();
    }

    /**
     * Function for stopping sound.
     * @param {*} audio
     */
    stopSound(audio) {
        audio.pause();
    }

    /**
     * Function for initiating sound according to first contact with endboss or character is winning.
     */
    initiateSound() {
        if (this.checkingDistance() && this.isAlive()) {
            this.playSound(character_endboss_contact);
        } else if (this.level.endboss[0].energy == 0) {
            this.stopSound(character_endboss_contact)
            this.playSound(character_winning);
            setTimeout(() => {
                this.stopSound(character_winning)
            }, 120000);
        }
    }


    /**
     * Checking location of character to see if he's close to endboss.
     * @returns {boolean}
     */
    checkingDistance() {
        return this.character.x > 1800
    }

    /**
     * Checking if object (endboss) is alive.
     * @returns {boolean}
     */
    isAlive() {
        return this.level.endboss[0].energy > 0
    }


    /**
     * Adding objects to Map.
     * @param {*} objects
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }


    /**
     * Adding object to map.
     * @param {*} mo
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * Flipping image of movable object.
     * @param {*} mo
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Flipping image back to starting direction.
     * @param {*} mo
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}