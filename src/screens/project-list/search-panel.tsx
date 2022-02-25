import React from 'react';
import { Select, Input, Form } from 'antd';

export interface User {
  id: string;
  name: string;
  token: string;
}
export interface Params {
  personId: string;
  name: string;
}
export interface SearchPanelProps {
  users: User[];
  params: Params;
  setParams: React.Dispatch<React.SetStateAction<Params>>;
}
const SearchPanel: React.FC<SearchPanelProps> = ({
  users,
  params,
  setParams,
}) => {
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
        <Select
          value={params.personId}
          onChange={(value) => setParams({ ...params, personId: value })}
        >
          <Select.Option value={''}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
