/**
 * Creates a delayed version of the given function that will only execute
 * after the specified delay in milliseconds.
 * 
 * @param {Function} fn - The function to delay.
 * @param {number} delay - The time to delay in milliseconds.
 * @returns {Function} A new function that delays the execution of `fn`.
 */
export function delayedExecution(fn, delay) {
    return function(...args) {
        setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

/**
 * Creates a delayed version of the given function with cancellation capability.
 * 
 * @param {Function} fn - The function to delay.
 * @param {number} delay - The time to delay in milliseconds.
 * @returns {Object} An object containing the delayed function and a cancel method.
 */
export function delayedExecutionWithCancel(fn, delay) {
    let timerId = null;
    const delayedFn = function(...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };

    delayedFn.cancel = function() {
        clearTimeout(timerId);
        console.log("Delayed execution canceled!");
    };

    return delayedFn;
}
