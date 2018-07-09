var ctxAudio, osc;

const createOsc = (wave) => {
  ctxAudio = new (window.AudioContext || window.webkitAudioContext)();
  osc = ctxAudio.createOscillator();
  osc.type = wave;
  osc.start();
}
createOsc ('sawtooth');

const playOsc = (freq) => {
  osc.connect(ctxAudio.destination);
  osc.frequency.value = freq;
}

$(document).on('keydown', e => {
  for (let i = 0; i < com.length; i++) {
    if (e.keyCode === com[i].keycode && com[i].prop === 'osc') {
      playOsc(com[i].freq);
    }
  }
});

$(document).on('keyup', e => {
  for (let i = 0; i < com.length; i++) {
    if (e.keyCode === com[i].keycode) {
      if (OscillatorNode !== undefined) {
        osc.disconnect(ctxAudio.destination);
      }
    }
  }
});

