import React, { useEffect, useState } from 'react';

const Test = () => {
  const [num, setNum] = useState(0);
  // useEffect是在浏览器绘制完成后运行effect
  // 1. 绘制
  // 2. 清除
  // 3. 执行
  useEffect(() => {
    console.log('执行了：', num);
    return () => {
      console.log('卸载了： ', num);
    };
  }, [num]);
  return (
    <div>
      <button onClick={() => setNum(num + 1)}>+</button>
      {num}
    </div>
  );
};

export default Test;
