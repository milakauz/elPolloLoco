class Bottle extends MovableObject {
    y = 360;
    height = 90;
    width = 70;
    offSet = {
        top: 5,
        right: 5,
        bottom: 0,
        left: 5
    }

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = 150 + Math.random() * 2200;
    }
}