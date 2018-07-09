const leds = $('.ledCard')
const keysFront = $('.keyNorm')

$(document).on('keydown', e => {
  for (let i = 0; i < com.length; i++) {
    if (e.keyCode === com[i].keycode) {
      leds[0].classList.add('led_active')
      leds[1].classList.add('led_active')
      keysFront[com[i].locDom].classList.add('key_active')
    }
  }
})
$(document).on('keyup', e => {
  for (let i = 0; i < com.length; i++) {
    if (e.keyCode === com[i].keycode) {
      leds[0].classList.remove('led_active')
      leds[1].classList.remove('led_active')
      keysFront[com[i].locDom].classList.remove('key_active')
    }
  }
})