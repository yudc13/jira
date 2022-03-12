import React from 'react';
import { Input, Form } from 'antd';
import IdSelect from '@/components/id-select';
import UserSelect from '@/components/user-select';

export interface User {
  id: number;
  name: string;
  token: string;
}
export interface Params {
  personId?: number;
  name?: string;
}
export interface SearchPanelProps {
  params: Pick<Params, 'personId' | 'name'>;
  setParams: (params: Params) => void;
}
const SearchPanel: React.FC<SearchPanelProps> = ({ params, setParams }) => {
  return (
    <Form layout="inline" style={{ marginBottom: '2rem' }}>
      <Form.Item>
        <Input
          value={params.name}
          placeholder="请输入名称"
          onChange={(evt) => setParams({ ...params, name: evt.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          value={params.personId}
          onChange={(value) => setParams({ ...params, personId: value })}
          defaultOptionName={'负责人'}
        />
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
