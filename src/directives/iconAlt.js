export default {
  beforeMount(el, binding) {
    let innerClass = `fa fa-${binding.value.icon} float-right text-green-400 text-xl`

    if (binding.value.rigth) innerClass += ' float-right'

    el.innerHTML += `<i class="${innerClass}"></i>`
  }
}
