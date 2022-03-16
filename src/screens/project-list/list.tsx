import React from 'react';
import { Table, TableProps, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { User } from './search-panel';
import Pin from '@/components/pin';
import { useEditProject } from '@/hooks/projects';
import { ButtonNoPadding } from '@/components/libs';
import { useProjectModal } from '@/screens/project-list/utils';

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
  const { startEdit } = useProjectModal();
  // 这里使用柯里化来做
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  const editProject = (id: number) => startEdit(id);
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
    {
      render: (value: any, project: Project) => {
        return (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={'edit'} onClick={() => editProject(project.id)}>
                  编辑
                </Menu.Item>
                <Menu.Item key={'delete'}>删除</Menu.Item>
              </Menu>
            }
          >
            <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
          </Dropdown>
        );
      },
    },
  ];
  return <Table rowKey="id" pagination={false} columns={columns} {...rest} />;
};

export default List;
