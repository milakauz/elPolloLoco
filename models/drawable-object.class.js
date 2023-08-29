class drawableObject {
    x = 100;
    y = 300;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottle) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'black';
            ctx.rect(this.x + this.offSet.left, this.y + this.offSet.top, this.width - this.offSet.right - this.offSet.left, this.height - this.offSet.top - this.offSet.bottom);
            ctx.stroke();
        }
    }
}