import C64, {waves} from './C64.js';

function createOsc (wave) {
    let ctxAudio = new (window.AudioContext || window.webkitAudioContext)();
    let osc = ctxAudio.createOscillator();
    osc.type = wave;
    osc.start();
    
    return {ctxAudio, osc};
}

function playOsc(ctxAudio, osc, freq) {
    osc.connect(ctxAudio.destination);
    osc.frequency.value = freq;
}

function animateLeds(bool) {
    Array.from(document.querySelectorAll('.ledCard'))
    .map(led => {
        if (!bool) {
            led.classList.remove('led_active');
        }
        else {
            led.classList.add('led_active');
        }
    });
}

function animateKeys(arrKey, bool) {
    let keysFront = document.querySelectorAll('.keyNorm');
    
    if(!bool) {
        keysFront[arrKey].classList.remove('key_active');
    }
    else {
        keysFront[arrKey].classList.add('key_active');
    }
}

// MAIN
document.addEventListener("DOMContentLoaded", () => { 
    let {ctxAudio, osc} = createOsc(waves.sawtooth);
    
    document.addEventListener('keydown', e => {
        C64.map(key => {
            if (e.keyCode === key.keycode) {
                playOsc(ctxAudio, osc, key.freq);
                animateLeds(true);
                animateKeys(key.locDom, true);
            }
        });
    });
    
    document.addEventListener('keyup', e => {
        C64.map(key => {
            if (e.keyCode === key.keycode) {
                osc.disconnect(ctxAudio.destination);
                animateLeds(false);
                animateKeys(key.locDom, false);
            }
        });
    });
});