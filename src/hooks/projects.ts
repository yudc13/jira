import { useHttp } from '@/utils/http';
import { Params } from '@/screens/project-list/search-panel';
import { Project } from '@/screens/project-list/list';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const useProjects = (params?: Params) => {
  const http = useHttp();
  return useQuery<Project[], Error>(['projects', params], () =>
    http<Project[]>('projects', { data: params })
  );
};

export const useEditProject = () => {
  const http = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      http(`projects/${params.id}`, {
        data: params,
        method: 'PATCH',
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects'),
    }
  );
};

export const useAddProject = () => {
  const http = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      http(`projects`, {
        data: params,
        method: 'POST',
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects'),
    }
  );
};

export const useProject = (projectId?: number) => {
  const http = useHttp();
  return useQuery<Project, Error>(
    ['project', { projectId }],
    () => http(`projects/${projectId}`),
    {
      enabled: !!projectId,
    }
  );
};
