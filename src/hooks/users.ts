import { User } from '@/screens/project-list/search-panel';
import { useHttp } from '@/utils/http';
import { useQuery } from 'react-query';

export const useUsers = () => {
  const http = useHttp();
  return useQuery('users', () => http<User[]>(`users`, {}));
};
