import { useEffect, useState } from 'react';
import List, { Project } from './list';
import SearchPanel, { Params, User } from './search-panel';
import { clearObject } from '@/utils';
import useDebounce from '@/hooks/useDebounce';
import { useHttp } from '@/utils/http';

const ProjectList = () => {
  const [params, setParams] = useState<Params>({ name: '', personId: '' });
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const http = useHttp();

  const debounceParams = useDebounce<Params>(params, 1000);

  useEffect(() => {
    http<User[]>(`users`, {}).then(async (data) => {
      setUsers(data);
    });
  }, []);

  useEffect(() => {
    http<Project[]>('projects', { data: clearObject(debounceParams) }).then(
      async (data) => {
        setProjects(data);
      }
    );
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
