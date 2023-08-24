class Bottle extends MovableObject {
    height = 120;
    width = 120;
    y = 340;
    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = 150 + Math.random() * 2200;
    }
} 