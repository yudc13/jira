const SearchPanel = ({ users, params, setParams }) => {
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
