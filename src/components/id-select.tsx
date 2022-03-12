import React from 'react';
import { Select } from 'antd';

type SelectProps = React.ComponentProps<typeof Select>;
interface IdSelectProps
  extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value: null | undefined | string | number;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options: { name: string; id: number }[];
}

/**
 * value可以传入多种类型
 * onChange回调只会返回number 类型
 * 当传入的IsNaN(Number(value)) === true时，表示选中默认类型
 * 当onChange回调参数值为undefined时，表示选中默认类型
 * @param props
 * @constructor
 */
const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={options.length > 0 ? toNumber(value) : 0}
      onChange={(value) => onChange(toNumber(value))}
      {...restProps}
    >
      {defaultOptionName && (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      )}
      {options.map((opt) => (
        <Select.Option value={opt.id} key={opt.id}>
          {opt.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));

export default IdSelect;
