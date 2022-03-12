// 判断组件是否已经挂载
// 已经挂载返回true 如果还没有挂载或者已经被销毁了返回false
import { useEffect, useRef } from 'react';

const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    // 组件已经挂载 渲染完成
    mountedRef.current = true;
    // 卸载时
    return () => {
      mountedRef.current = false;
    };
  }, []);
  return mountedRef;
};

export default useMountedRef;
