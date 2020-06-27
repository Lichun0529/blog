export default {
    function debounce(func, wait, immediate) {
      let timer;
      return function() {
        let context = this,
            args = arguments;
            
        if (timer) clearTimeout(timer);
        if (immediate) {
          let callNow = !timer;
          timer = setTimeout(() => {
            timer = null;
          }, wait);
          if (callNow) func.apply(context, args);
        } else {
          timer  = setTimeout(() => {
            func.apply
          }, wait)
        }
      }
  }
}