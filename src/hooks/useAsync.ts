import { useState } from 'react';

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

const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D | null>>({
    ...defaultState,
    ...initialState,
  });
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
  const run = (promise: Promise<D>) => {
    if (!promise) {
      throw new Error('参数必须是一个Promise类型');
    }
    promise
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
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
    ...state,
  };
};

export default useAsync;
