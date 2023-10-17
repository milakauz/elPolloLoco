class BottleBar extends StatusBar {
    collectedBottles = 0;

    IMAGES = [
       'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png', 
       'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png', 
       'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png', 
       'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png', 
       'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png', 
       'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    constructor() {
        super();
        this.loadImage('img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png');
        this.loadImages(this.IMAGES);
        this.y = 150;
    }

    
    /**
     * Updating bar if chracter collects new bottles.
     */
    updateBar() {
        let imagePath = this.IMAGES[this.resolveImageIndexCollectables(this.collectedBottles)];
        this.img = this.imageCache[imagePath];
    }
}