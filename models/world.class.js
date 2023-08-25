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

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy)
            }
        });
    }

    //     this.level.bottles.forEach((bottle, i) => {
    //     if (this.character.isColliding(bottle)) {
    //         console.log('FLASCHE GETROFFEN!');
    //         // this.character.collectedBottles.push(+1);
    //         console.log(this.character.collectedBottles);
    //         // Charakter muss sammeln 
    //         // Bottle muss bei collision sofort gelöscht werden
    //         this.ctx.clearRect(bottle.y, bottle.x, bottle.width, bottle.height);
    //         this.level.bottles.splice(i, 1);
    //     }
    // };

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