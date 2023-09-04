let soundOffContainer = document.getElementById('soundOff');
let soundOnContainer = document.getElementById('soundOn');


const character_jumping_sound = new Audio('audio/jump.wav');
const character_walking_sound = new Audio('audio/running.mp3');
const endboss_hitting_sound = new Audio('./audio/hit_endboss.mp3');
const bottle_collecting_sound = new Audio('audio/collect_bottle.mp3');
const coin_collecting_sound = new Audio('audio/collect_coin.mp3');

var muted = false;

let sounds = [
    character_jumping_sound,
    character_walking_sound,
    endboss_hitting_sound, 
    bottle_collecting_sound,
    coin_collecting_sound
]

function mute() {
    if (muted == false) {
        muted = true;
        // soundOffContainer.classList.add('d-none');
        // soundOnContainer.classList.remove('d-none');
        for (let i = 0; i < sounds.length; i++) {
            const sound = sounds[i];
            sound.muted();
        }
        console.log('LEISE!')
    }
}

function unmute() {
    if (muted == true) {
        muted = false;
        // soundOnContainer.classList.add('d-none');
        // soundOffContainer.classList.remove('d-none');

    }
}