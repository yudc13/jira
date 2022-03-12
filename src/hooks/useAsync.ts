import { useState } from 'react';
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

const useAsync = <D>(initialState?: Partial<State<D>>) => {
  const [state, setState] = useState<State<D | null>>({
    ...defaultState,
    ...initialState,
  });
  const mountedRef = useMountedRef();
  // useState初始值是一个惰性的state，只有在初次渲染的时候调用
  const [retry, setRetry] = useState(() => () => {});
  const setData = (data: D) => {
    setState({
      stat: 'success',
      data,
      error: null,
    });
  };
  const setError = (error: Error) => {
    setState({
      error,
      stat: 'error',
      data: null,
    });
  };
  const run = (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise) {
      throw new Error('参数必须是一个Promise类型');
    }
    // 保存上一次调用的方法
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig.retry(), runConfig);
      }
    });
    setState({ stat: 'loading', data: null, error: null });
    return promise
      .then((data) => {
        if (mountedRef.current) {
          setData(data);
        }
        return data;
      })
      .catch((error) => {
        setError(error);
        // catch会消化异常，如果不主动抛出错误 外面将无法捕获到异常
        return Promise.reject(error);
      });
  };
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
