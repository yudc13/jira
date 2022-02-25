import React from 'react';
import { Table } from 'antd';
import dayjs from 'dayjs';
import { User } from './search-panel';

export interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
  created: number;
}
export interface ListProps {
  projects: Project[];
  users: User[];
}

const List: React.FC<ListProps> = ({ projects, users }) => {
  const columns = [
    { key: 'name', title: '名称', dataIndex: 'name' },
    { key: 'organization', title: '部门', dataIndex: 'organization' },
    {
      key: 'personId',
      title: '负责人',
      dataIndex: 'personId',
      render: (personId: string) =>
        users.find((user) => user.id === personId)?.name,
    },
    {
      key: 'created',
      title: '创建时间',
      dataIndex: 'created',
      render: (created: number) =>
        created ? dayjs(created).format('YYYY-MM-DD') : '',
    },
  ];
  return <Table pagination={false} dataSource={projects} columns={columns} />;
};

export default List;
