class Keyboard {
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    D = false;

    constructor() {
        this.bindKeyPressEvents();
        this.bindBtnsPressEvents();
    }

    bindKeyPressEvents() {
        document.addEventListener('keydown', (e) => {
            if ((e.keyCode == 38)) {
                keyboard.UP = true;
            }
        
            if ((e.keyCode == 39)) {
                keyboard.RIGHT = true;
            }
        
            if ((e.keyCode == 40)) {
                keyboard.DOWN = true;
            }
        
            if ((e.keyCode == 37)) {
                keyboard.LEFT = true;
            }
        
            if ((e.keyCode == 32)) {
                keyboard.SPACE = true;
            }
        
            if ((e.keyCode == 68)) {
                keyboard.D = true;
            }
        })
        
        document.addEventListener('keyup', (e) => {
            if ((e.keyCode == 38)) {
                keyboard.UP = false;
            }
            if ((e.keyCode == 39)) {
                keyboard.RIGHT = false;
            }
        
            if ((e.keyCode == 40)) {
                keyboard.DOWN = false;
            }
        
            if ((e.keyCode == 37)) {
                keyboard.LEFT = false;
            }
        
            if ((e.keyCode == 32)) {
                keyboard.SPACE = false;
            }
        
            if ((e.keyCode == 68)) {
                keyboard.D = false;
            }
        })
        
    }

    bindBtnsPressEvents() {
        document.getElementById('mobileLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });

        document.getElementById('mobileLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        document.getElementById('mobileRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });

        document.getElementById('mobileRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });

        document.getElementById('mobileJump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });

        document.getElementById('mobileJump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });

        document.getElementById('mobileThrow').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.D = true;
        });

        document.getElementById('mobileThrow').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.D = false;
        });


    }
}