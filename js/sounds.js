const bottle_collecting = new Audio('audio/collect_bottle.mp3');
const bottle_splashing = new Audio('./audio/glass.mp3');
const character_endboss_contact = new Audio('audio/danger.wav');
const character_jumping = new Audio('audio/jump.wav');
const character_walking = new Audio('audio/running.mp3');
const character_winning = new Audio('audio/winning1.mp3');
const coin_collecting = new Audio('audio/collect_coin.mp3');
const endboss_hitting = new Audio('./audio/hit_endboss.mp3');
let soundTuning;

let sounds = [
    bottle_splashing,
    bottle_collecting,
    character_endboss_contact,
    character_jumping,
    character_walking,
    character_winning,
    coin_collecting,
    endboss_hitting
]

/* */
/**
 * Muting Sounds.
 */
function mute() {
    for (let i = 0; i < sounds.length; i++) {
        const sound = sounds[i];
        if (sound.muted == false) {
            sound.muted = true;
        }
    }
    soundTuning = 'muted';
    saveSoundStorage();
    changeIconsToMuted();
}

/**
 * Changing icons in canvas according to sound status muted.
 */
function changeIconsToMuted() {
    let soundOffContainer = document.getElementById('soundOff');
    let soundOnContainer = document.getElementById('soundOn');
    soundOffContainer.classList.add('d-none');
    soundOnContainer.classList.remove('d-none');
}

/**
 * Changing icons in canvas according to sound status unmuted.
 */
function changeIconsToUnmuted() {
    let soundOffContainer = document.getElementById('soundOff');
    let soundOnContainer = document.getElementById('soundOn');
    soundOnContainer.classList.add('d-none');
    soundOffContainer.classList.remove('d-none');
}

/**
 * Unmuting sound.
 */
function unmute() {
    for (let i = 0; i < sounds.length; i++) {
        const sound = sounds[i];
        if (sound.muted == true) {
            sound.muted = false;
        }
        soundTuning = 'unmuted';
        saveSoundStorage();
        changeIconsToUnmuted();
    }
}

/**
 * Saving sound status to local storage for remembering settings.
 */
function saveSoundStorage() {
    localStorage.setItem('sound', JSON.stringify(soundTuning));
}

/**
 * Gettin sound status from local storage to be applied.
 */
function getSoundStorage() {
    soundTuning = JSON.parse(localStorage.getItem('sound'))
    regulateSound();
}

/**
 * Regulating sound.
 */
function regulateSound() {
    if (soundTuning == 'muted') {
        mute();
    } else if (soundTuning == 'unmuted') {
        unmute();
    }
}