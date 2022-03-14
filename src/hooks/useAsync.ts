import { Dispatch, useCallback, useReducer, useState } from 'react';
import useMountedRef from '@/hooks/useMountedRef';

interface State<S> {
  error: Error | null;
  data: S;
  stat: 'idle' | 'loading' | 'error' | 'success';
}

const defaultState: State<null> = {
  stat: 'idle',
  data: null,
  error: null,
};

const useSafeDispatch = <D>(dispatch: (...args: D[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: D[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

const useAsync = <D>(initialState?: Partial<State<D>>) => {
  const [state, dispatch] = useReducer(
    (state: State<D | null>, newState: Partial<State<D | null>>) => ({
      ...state,
      ...newState,
    }),
    {
      ...defaultState,
      ...initialState,
    }
  );
  const safeDispatch = useSafeDispatch(dispatch);
  // useState初始值是一个惰性的state，只有在初次渲染的时候调用
  const [retry, setRetry] = useState(() => () => {});
  const setData = useCallback(
    (data: D) => {
      safeDispatch({
        stat: 'success',
        data,
        error: null,
      });
    },
    [safeDispatch]
  );
  const setError = useCallback(
    (error: Error) => {
      safeDispatch({
        error,
        stat: 'error',
        data: null,
      });
    },
    [safeDispatch]
  );
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise) {
        throw new Error('参数必须是一个Promise类型');
      }
      // 保存上一次调用的方法
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig.retry(), runConfig);
        }
      });
      safeDispatch({ stat: 'loading' });
      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          // catch会消化异常，如果不主动抛出错误 外面将无法捕获到异常
          return Promise.reject(error);
        });
    },
    [safeDispatch, setData, setError]
  );
  return {
    isIdle: state.stat === 'idle',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    isLoading: state.stat === 'loading',
    setData,
    setError,
    run,
    retry,
    ...state,
  };
};

export default useAsync;
