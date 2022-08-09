import { useCallback, useEffect, useRef, useState } from "react";

export const useEffectOnce = (cb) => {
   // eslint-disable-next-line react-hooks/exhaustive-deps
   useEffect(cb, []);
};

export function useAsync(callback, dependencies = []) {
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState();
   const [value, setValue] = useState();

   const callbackMemoized = useCallback(() => {
      setLoading(true);
      setError(undefined);
      setValue(undefined);
      callback()
         .then(setValue)
         .catch(setError)
         .finally(() => setLoading(false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, dependencies);

   useEffect(() => {
      callbackMemoized();
   }, [callbackMemoized]);

   return { loading, error, value };
}

export const useUpdateEffect = (cb, dependencies) => {
   const isFirstTimeRef = useRef(true);
   useEffect(() => {
      if (isFirstTimeRef.current) {
         isFirstTimeRef.current = false;
         return;
      }
      cb();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, dependencies);
};
