import { useRef, useEffect } from "react";

const useDeepEffect = (callback, dependencies) => {
  const currentDepsRef = useRef(dependencies);

  useEffect(() => {
    let hasChanged = false;

    if (currentDepsRef.current.length !== dependencies.length) {
      hasChanged = true;
    } else {
      hasChanged = dependencies.some((dep, index) => !Object.is(dep, currentDepsRef.current[index]));
    }

    if (hasChanged) {
      callback();
      currentDepsRef.current = dependencies;
    }
  }, [callback, dependencies]);
}
export default useDeepEffect;
