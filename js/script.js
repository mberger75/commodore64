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

function animate(arrKey, bool) {
    let keysFront = document.querySelectorAll('.keyNorm');

    Array.from(document.querySelectorAll('.ledCard'))
    .map(led => {
        if (!bool) {
            led.classList.remove('led_active');
            keysFront[arrKey].classList.remove('key_active');
        }
        else {
            led.classList.add('led_active');
            keysFront[arrKey].classList.add('key_active');
        }
    });
}

// MAIN
document.addEventListener('DOMContentLoaded', () => {

    let {ctxAudio, osc} = createOsc(waves.triangle);
    let keyPressed = {};

    onkeydown = onkeyup = e => {
        keyPressed[e.keyCode] = e.type === 'keydown';

        if (keyPressed[e.keyCode] === true) {
            C64.map(key => {
                if (e.keyCode === key.keycode) {
                    animate(key.locDom, true);
                    playOsc(ctxAudio, osc, key.freq);
                }
            });
        }
        else {
            C64.map(key => {
                if (e.keyCode === key.keycode) {
                    animate(key.locDom, false);
                    if (ctxAudio.destination) {
                        osc.disconnect(ctxAudio.destination);
                    }
                }
            });
        }
    }

    // setInterval(() => console.log(pressedKeys), 100);
});