class Coin extends MovableObject {
    offSet = {
        top: 50,
        right: 55,
        bottom: 50,
        left: 55 
    }
    PULSATING_IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]
    constructor(imagePath) {
        super();
        this.loadImage(imagePath);
        this.loadImages(this.PULSATING_IMAGES);
        this.x = 150 + Math.random() * 2200;
        this.y = 120 + Math.random() * 80;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.PULSATING_IMAGES);
        }, 1000 / 2);
    }

    
}