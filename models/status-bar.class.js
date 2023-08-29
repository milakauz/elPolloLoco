class StatusBar extends drawableObject {
    height = 50;
    width = 250;
    x = 50;

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

    resolveImageIndexCollectables(collectables) {
        if (collectables == 0) {
            return 0;
        } else if (collectables == 1) {
            return 1;
        } else if (collectables == 2) {
            return 2;
        } else if (collectables == 3) {
            return 3;
        } else if (collectables == 4) {
            return 4;
        } else {
            return 5;
        }
    }

    playCollectingSound(audio) {
        audio.play();
    }
}