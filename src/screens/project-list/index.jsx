import { useEffect, useState } from 'react';
import qs from 'qs';
import List from './list';
import SearchPanel from './search-panel';
import { clearObject } from '../../utils';
import useDebounce from '../../hooks/useDebounce';

const apiUrl = process.env.REACT_APP_URL;

const ProjectList = () => {
  const [params, setParams] = useState({ name: '', id: '' });
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const debounceParams = useDebounce(params, 1000);

  console.log(debounceParams, params);

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(clearObject(debounceParams))}`
    ).then(async (response) => {
      if (response.ok) {
        setProjects(await response.json());
      }
    });
  }, [debounceParams]);

  return (
    <>
      <SearchPanel
        params={params}
        users={users}
        setParams={(params) => setParams(params)}
      />
      <List projects={projects} users={users} />
    </>
  );
};

export default ProjectList;
