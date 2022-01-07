const List = ({ projects, users }) => {
  return (
    <table border="1" style={{ width: 220 }}>
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
