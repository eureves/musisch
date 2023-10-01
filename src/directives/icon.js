export default {
  beforeMount(el, binding) {
    let innerClass = `fa fa-${binding.value} float-right text-green-400 text-xl`

    if (binding.arg === 'full') innerClass = binding.value

    if (binding.modifiers.rigth) innerClass += ' float-right'

    if (binding.modifiers.yellow) innerClass += ' text-yellow-400'
    else innerClass += ' text-green-400'

    el.innerHTML += `<i class="${innerClass}"></i>`
  }
}
