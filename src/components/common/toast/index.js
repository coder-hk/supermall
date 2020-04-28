import Toast from './Toast'
const ToastCompon = {}
ToastCompon.install = function(Vue){
  const toastConstructor = Vue.extend(Toast)
  const toast = new toastConstructor()
  toast.$mount(document.createElement('div'))
  document.body.appendChild(toast.$el);
  Vue.prototype.$toast = toast
}
export default ToastCompon
