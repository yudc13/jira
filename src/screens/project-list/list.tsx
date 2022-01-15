import React from 'react';
import { Table } from 'antd';
import { User } from './search-panel';

export interface Project {
  id: string;
  name: string;
  personId: string;
}
export interface ListProps {
  projects: Project[];
  users: User[];
}

const List: React.FC<ListProps> = ({ projects, users }) => {
  const columns = [
    { key: 'name', title: '名称', dataIndex: 'name' },
    {
      key: 'personId',
      title: '负责人',
      dataIndex: 'personId',
      render: (personId: string) =>
        users.find((user) => user.id === personId)?.name,
    },
  ];
  return <Table pagination={false} dataSource={projects} columns={columns} />;
};

export default List;
