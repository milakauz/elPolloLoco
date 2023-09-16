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

async function startGame() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    if (checkDeviceWidth(w, h)) {
        adjustForDevice(h);
    }
    console.log(w, h);
    await initLevel();
    startScreen.classList.add('d-none');
    startBtn.classList.add('d-none');
    canvas.classList.remove('d-none');
    world = new World(canvas, keyboard);
}

function checkDeviceWidth(w, h) {
    return w >= 500;
}

function adjustForDevice(height) {
    mobileBtns.classList.remove('d-none');
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

function showGameInformation() {
    background.classList.remove('d-none');
    document.getElementById('gameInformation').classList.remove('d-none');
}

function closeGameInformation() {
    background.classList.add('d-none');
    for (let i = 0; i < infoList.length; i++) {
        const element = array[i];
        element.classList.add('d-none');
    }
}

function showKeyboardInformation() {
    background2.classList.remove('d-none');
    document.getElementById('keyboardInformation').classList.remove('d-none');
}

function closeKeyboardInformation() {
    background2.classList.add('d-none');
    document.getElementById('keyboardInformation').classList.add('d-none');
}

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

function cleanseCanvas() {
    document.getElementById('endScreenContainer').classList.add('d-none');
    document.getElementById('PCDead').classList.add('d-none');
    document.getElementById('endBtn').classList.add('d-none');
}

function reloadGame() {
    location.reload();
}