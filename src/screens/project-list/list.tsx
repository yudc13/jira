import React from 'react';
import { User } from './search-panel';

export interface Project {
  id: string;
  name: string;
  userId: string;
}
export interface ListProps {
  projects: Project[];
  users: User[];
}

const List: React.FC<ListProps> = ({ projects, users }) => {
  return (
    <table style={{ width: 220 }}>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{users.find((user) => user.id === item.userId)?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
