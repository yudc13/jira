import React from 'react';
import { Table, TableProps } from 'antd';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { User } from './search-panel';
import Pin from '@/components/pin';
import { useEditProject } from '@/hooks/projects';

export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
  pin?: boolean;
}
export interface ListProps extends TableProps<Project> {
  users: User[];
}

const List: React.FC<ListProps> = ({ users, ...rest }) => {
  const { mutate } = useEditProject();
  // 这里使用柯里化是做
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  const columns = [
    {
      key: 'pin',
      title: <Pin checked={true} disabled={true} />,
      render: (pin: boolean, record: Project) => (
        <Pin
          checked={record.pin || false}
          onCheckChange={pinProject(record.id)}
        />
      ),
    },
    {
      key: 'name',
      title: '名称',
      dataIndex: 'name',
      render: (name: string, record: Project) => (
        <Link to={`/projects/${record.id}`}>{name}</Link>
      ),
    },
    { key: 'organization', title: '部门', dataIndex: 'organization' },
    {
      key: 'personId',
      title: '负责人',
      dataIndex: 'personId',
      render: (personId: number) =>
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
  return <Table rowKey="id" pagination={false} columns={columns} {...rest} />;
};

export default List;
