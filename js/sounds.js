const bottle_collecting = new Audio('audio/collect_bottle.mp3');
const bottle_splashing = new Audio('./audio/glass.mp3')
const character_jumping = new Audio('audio/jump.wav');
const character_walking = new Audio('audio/running.mp3');
const coin_collecting = new Audio('audio/collect_coin.mp3');
const endboss_hitting = new Audio('./audio/hit_endboss.mp3');

let soundTuning;

let sounds = [
    bottle_splashing,
    bottle_collecting,
    character_jumping,
    character_walking,
    coin_collecting,
    endboss_hitting
]

function mute() {
    let soundOffContainer = document.getElementById('soundOff');
    let soundOnContainer = document.getElementById('soundOn');

    for (let i = 0; i < sounds.length; i++) {
        const sound = sounds[i];
        if (sound.muted == false) {
            sound.muted = true;
        }
    }
    soundTuning = 'muted';
    saveSoundStorage();
    soundOffContainer.classList.add('d-none');
    soundOnContainer.classList.remove('d-none');
}

function unmute() {
    let soundOffContainer = document.getElementById('soundOff');
    let soundOnContainer = document.getElementById('soundOn');

    for (let i = 0; i < sounds.length; i++) {
        const sound = sounds[i];
        if (sound.muted == true) {
            sound.muted = false;
        }
        soundTuning = 'unmuted';
        saveSoundStorage();
        soundOnContainer.classList.add('d-none');
        soundOffContainer.classList.remove('d-none');
    }
}

function saveSoundStorage() {
    localStorage.setItem('sound', JSON.stringify(soundTuning));
}

function getSoundStorage() {
    soundTuning = JSON.parse(localStorage.getItem('sound'))
    regulateSound();
}

function regulateSound() {
    if (soundTuning == 'muted') {
        mute();
    } else if (soundTuning == 'unmuted') {
        unmute();
    }
}