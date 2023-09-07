class Coin extends MovableObject {
    offSet = {
        top: 10,
        right: 15,
        bottom: 10,
        left: 15
    }
    height = 80;
    width = 80;

    PULSATING_IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    constructor(imagePath) {
        super();
        this.loadImage(imagePath);
        this.loadImages(this.PULSATING_IMAGES);
        this.x = 180 + Math.random() * 2000;
        this.y = 120 + Math.random() * 100;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.PULSATING_IMAGES);
        }, 400);
    }
}