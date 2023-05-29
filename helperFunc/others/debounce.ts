// debounce
// fn is the function that needs debounce, delay is the timer time
export function debounce(fn, delay) {
  let timer = null; // for saving the timer
  return function () {
    // If the timer exists, clear the timer and restart the timer
    if (timer) {
      clearTimeout(timer);
    }
    //Set a timer and execute the actual function to be executed after a specified time
    timer = setTimeout(() => {
      fn.apply(this);
    }, delay);
  };
}

// throttle
export function throttle(fn) {
  let timer = null; // First set a variable, when the timer is not executed, the default is null
  return function () {
    if (timer) return; // When the timer is not executed, the timer is always false, and there is no need to execute it later
    timer = setTimeout(() => {
      //@ts-ignore
      fn.apply(this, arguments);
      // Finally, set the flag to true after setTimeout is executed (key)
      // Indicates that the next cycle can be executed
      timer = null;
    }, 1000);
  };
}
