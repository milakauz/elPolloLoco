class CoinBar extends StatusBar {
    collectedCoins = 0;

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    constructor() {
        super();
        this.loadImage('img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png');
        this.loadImages(this.IMAGES);
        this.y = 100;
        console.log(this.collectedCoins);
        // super().updateBar(this.collectedCoins);
    }

        
    updateBar() {
        let imagePath = this.IMAGES[this.resolveImageIndexCollectables(this.collectedCoins)];
        this.img = this.imageCache[imagePath];
    }
}