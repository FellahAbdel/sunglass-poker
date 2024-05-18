import { useRef, useEffect } from "react";

/**
 * Custom hook that works similarly to useEffect but performs a deep comparison
 * on the dependencies to determine if the callback should be called.
 *
 * @param {Function} callback - The callback function to run when dependencies change.
 * @param {Array} dependencies - The list of dependencies to watch for changes.
 */
const useDeepEffect = (callback, dependencies) => {
  const currentDepsRef = useRef(dependencies);

  useEffect(() => {
    let hasChanged = false;

    // Check if the length of the dependencies array has changed
    if (currentDepsRef.current.length !== dependencies.length) {
      hasChanged = true;
    } else {
      hasChanged = dependencies.some((dep, index) => !Object.is(dep, currentDepsRef.current[index]));
    }
    // If dependencies have changed, call the callback and update the ref
    if (hasChanged) {
      callback();
      currentDepsRef.current = dependencies;
    }
  }, [callback, dependencies]);
}
export default useDeepEffect;
