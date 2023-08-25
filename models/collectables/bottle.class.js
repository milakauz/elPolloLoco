class Bottle extends MovableObject {
    y = 360;
    height = 90;
    width = 70;

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = 150 + Math.random() * 2200;
    }
}