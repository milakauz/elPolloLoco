class Coin extends Collectable {
    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = 60 + Math.random() * 0.25;
        this.y = 200 + Math.random();
        console.log('HALLO!');
    }
}