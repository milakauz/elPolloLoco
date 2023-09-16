let canvas = document.getElementById('canvas');
let startScreen = document.getElementById('startScreenContainer');
let startBtn = document.getElementById('startGameBtn');
let background = document.getElementById('backgroundDialog1');
let background2 = document.getElementById('backgroundDialog2');
let world;
let keyboard = new Keyboard();
let infoList = document.querySelectorAll('info');

function init() {
    getSoundStorage();
}

/**
 * Function for initializing level and setting world for game to be started.
 * 
 * @async
 * @returns {*}
 */
async function startGame() {
    checkResponsive();
    await initLevel();
    startScreen.classList.add('d-none');
    startBtn.classList.add('d-none');
    canvas.classList.remove('d-none');
    world = new World(canvas, keyboard);
}


/**
 * Checking if responsive design is neede according to height and width of window.
 */
function checkResponsive() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    if (checkDeviceWidth(w)) {
        adjustForDevice(h);
        showMobileButtons(w);
    }
}


/**
 * Function for cheking if mobile buttons should be shown.
 * @param {*} w
 */
function showMobileButtons(w) {
    if (w <= 900) {
        mobileBtns.classList.remove('d-none');
    }
}


/**
 * Cheking device width.
 * @param {*} w
 * @returns {boolean}
 */
function checkDeviceWidth(w) {
    return w >= 500;
}


/**
 * Adjusting canvas height according to height of window.
 * @param {*} height
 */
function adjustForDevice(height) {
    document.getElementById('canvasContainer').style.width = 'unset';
    let canvascontainer = document.getElementById('canvasContainer');
    if (height >= 400) {
        canvascontainer.style.height = '400px';
    } else if (height >= 374) {
        canvascontainer.style.height = '360px';
    } else if (height >= 349) {
        canvascontainer.style.height = '335px';
    }
}


/**
 * Opening DOM element for showing game informations.
 */
function showGameInformation() {
    background.classList.remove('d-none');
    document.getElementById('gameInformation').classList.remove('d-none');
}


/**
 * Closing DOM element which shows game information.
 */
function closeGameInformation() {
    background.classList.add('d-none');
    for (let i = 0; i < infoList.length; i++) {
        const element = array[i];
        element.classList.add('d-none');
    }
}


/**
 *  Opening DOM element for showing keyboard informations.
 */
function showKeyboardInformation() {
    background2.classList.remove('d-none');
    document.getElementById('keyboardInformation').classList.remove('d-none');
}

/**
 *  Closing DOM element which shows keyboard informations.
 */
function closeKeyboardInformation() {
    background2.classList.add('d-none');
    document.getElementById('keyboardInformation').classList.add('d-none');
}


/**
 * Opening full screen for different browsers.
 */
function openFullScreen() {
    console.log('openFullScreen wird aufgerufen!');
    const canvas = document.getElementById('canvasContainer');
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}


/**
 * Showding endscreen according to which object is dead. 
 * @param {*} a
 */
function showEndScreen(a) {
    document.getElementById('endScreenContainer').classList.remove('d-none');
    if (a == 'NPC') {
        document.getElementById('mobileBtns').classList.add('d-none');
        document.getElementById('startAgainBtn').classList.remove('d-none');
        document.getElementById('NPCDead').classList.remove('d-none');
    } else if (a == 'PC') {
        document.getElementById('mobileBtns').classList.add('d-none');
        document.getElementById('PCDead').classList.remove('d-none');
    }
}


/**
 * Removing all DOM elements from endscreen to reload Game.
 */
function cleanseCanvas() {
    document.getElementById('endScreenContainer').classList.add('d-none');
    document.getElementById('PCDead').classList.add('d-none');
    document.getElementById('endBtn').classList.add('d-none');
}


/**
 * Reloading game for it to be played again.
 */
function reloadGame() {
    location.reload();
}