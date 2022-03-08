import React from 'react';

type FallbackRender = ({
  error,
}: {
  error: Error | null;
}) => React.ReactElement;

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = {
    error: null,
  };
  // 子组件抛出异常，这里会被接收到
  static getDerivedStateFromError(error: Error) {
    // 更新 state 使下一次渲染可以显降级 UI
    return { error };
  }
  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
