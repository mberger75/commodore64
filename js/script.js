var ctxAudio;
var osc;

const waves = {
  sine: 'sine',
  square: 'square',
  sawtooth: 'sawtooth',
  triangle: 'triangle'
}

const createOsc = (wave) => {
  ctxAudio = new (window.AudioContext || window.webkitAudioContext)();
  osc = ctxAudio.createOscillator();
  osc.type = wave;
  osc.start();
}

const playOsc = (freq) => {
  osc.connect(ctxAudio.destination);
  osc.frequency.value = freq;
}

const animateLeds = (bool) => {
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

const animateKeys = (arrKey, bool) => {
  let keysFront = document.querySelectorAll('.keyNorm');

  if(!bool) {
    keysFront[arrKey].classList.remove('key_active');
  }
  else {
    keysFront[arrKey].classList.add('key_active');
  }
}

document.addEventListener("DOMContentLoaded", () => { 
  createOsc(waves.sawtooth);

  document.addEventListener('keydown', e => {
    com.map(key => {
      if (e.keyCode === key.keycode) {
        playOsc(key.freq);
        animateLeds(true);
        animateKeys(key.locDom, true);
      }
    });
  });
  
  document.addEventListener('keyup', e => {
    com.map(key => {
      if (e.keyCode === key.keycode) {
        osc.disconnect(ctxAudio.destination);
        animateLeds(false);
        animateKeys(key.locDom, false);
      }
    });
  });
});