import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { clearObject } from '@/utils';

const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useMemo(() => {
    return keys.reduce((pre, key) => {
      return { ...pre, [key]: searchParams.get(key) || '' };
    }, {} as { [k in K]: string });
  }, [keys, searchParams]);
  const setParams = useCallback(
    (param: Partial<{ [k in K]: unknown }>) => {
      setSearchParams(
        clearObject({ ...Object.fromEntries(searchParams), ...param })
      );
    },
    [setSearchParams, searchParams]
  );
  return [params, setParams] as const;
};

export default useUrlQueryParam;
