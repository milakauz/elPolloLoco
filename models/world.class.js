class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    camera_x = 0;
    healthBar = new HealthBar();
    coinsBar = new CoinBar();
    bottlesBar = new BottleBar();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        // übergibt aktuellen Zustand der Welt
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

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkBottleEnemyCollisions();
        }, 100);
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            if (this.checkBottlesToThrow()) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
                this.removeBottleFromCollection();
            }
        }
    }

    checkBottlesToThrow() {
        if (this.bottlesBar.collectedBottles === 0) {
            return false;
        } else {
            return true;
        }
    }

    removeBottleFromCollection() {
        this.bottlesBar.collectedBottles--;
        this.bottlesBar.updateBar();
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isAboveGround() && enemy.energy > 0) {
                this.character.hit(1);
                this.healthBar.setPercentage(this.character.energy)
            } else if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                enemy.dies();
                enemy.energy--;
                if (enemy.energy === 0) {
                    this.removeEnemyfromMap(enemy);
                }
            }
        });
    }

    checkBottleEnemyCollisions() {
        this.throwableObjects.forEach((bottle) => {
            this.level.endboss.forEach((endboss) => {
                if (bottle.isColliding(endboss) && !endboss.isDead) {
                    this.deleteBottleFromArray(bottle);
                    endboss.hit(4);
                    this.playSound(endboss_hitting_sound);
                    console.log(endboss.energy);
                }
            });
        });
    }

    removeEnemyfromMap(obj) {
        setTimeout(() => {
            this.level.enemies.splice(this.level.enemies.indexOf(obj), 1);
        }, 1000);
    }

    deleteBottleFromArray(b) {
        this.throwableObjects.splice(this.throwableObjects.indexOf(b),)
    }

    checkCoinCollisions() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                this.removeCoinOffMap(i);
                this.addCoinToStatusbar();
                this.playSound(coin_collecting_sound);
            }
        });
    }

    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, i) => {
            if (this.character.isColliding(bottle)) {
                this.removeBottleOffMap(i);
                this.addBottleToStatusbar();
                this.playSound(bottle_collecting_sound);
            }
        });
    }


    removeCoinOffMap(i) {
        this.level.coins.splice(i, 1);
    }

    addCoinToStatusbar() {
        this.coinsBar.collectedCoins++;
        this.coinsBar.updateBar();
    }

    removeBottleOffMap(i) {
        this.level.bottles.splice(i, 1);
    }

    addBottleToStatusbar() {
        this.bottlesBar.collectedBottles++;
        this.bottlesBar.updateBar();
    }

    playSound(audio) {
        audio.play();
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.drawFrame(this.ctx);
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}