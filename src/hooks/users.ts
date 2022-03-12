import { useEffect } from 'react';
import { User } from '@/screens/project-list/search-panel';
import { useHttp } from '@/utils/http';
import useAsync from '@/hooks/useAsync';

export const useUsers = () => {
  const http = useHttp();
  const { run, data } = useAsync<User[]>();
  useEffect(() => {
    run(http<User[]>(`users`, {}));
  }, []);
  return {
    data,
  };
};
