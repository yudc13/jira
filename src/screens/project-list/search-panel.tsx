import React from 'react';

export interface User {
  id: string;
  name: string;
  token: string;
}
export interface Params {
  id: string;
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
    <form>
      <input
        value={params.name}
        onChange={(evt) => setParams({ ...params, name: evt.target.value })}
      />
      <select
        value={params.id}
        onChange={(evt) => setParams({ ...params, id: evt.target.value })}
      >
        <option value={''}>负责人</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </form>
  );
};

export default SearchPanel;
