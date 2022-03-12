import React from 'react';
import { Rate } from 'antd';

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckChange?: (checked: boolean) => void;
}

const Pin = (props: PinProps) => {
  const { checked, onCheckChange, ...restProps } = props;
  return (
    <Rate
      value={checked ? 1 : 0}
      count={1}
      onChange={(num) => onCheckChange?.(!!num)}
      {...restProps}
    />
  );
};

export default Pin;
