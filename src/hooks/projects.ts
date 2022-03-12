import { useHttp } from '@/utils/http';
import useAsync from '@/hooks/useAsync';
import { Params } from '@/screens/project-list/search-panel';
import { Project } from '@/screens/project-list/list';
import { clearObject } from '@/utils';
import { useEffect } from 'react';

export const useProject = (params?: Params) => {
  const http = useHttp();
  const { run, retry, data, isLoading, isError, error } = useAsync<Project[]>();
  useEffect(() => {
    const fetchProjects = () =>
      http<Project[]>('projects', { data: clearObject(params || []) });

    run(fetchProjects(), { retry: fetchProjects });
    // eslint-disable-next-line
  }, [params]);
  return {
    data,
    isError,
    isLoading,
    error,
    retry,
  };
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const http = useHttp();
  const mutate = (param: Partial<Project>) => {
    return run(
      http(`projects/${param.id}`, {
        data: param,
        method: 'PATCH',
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const http = useHttp();
  const mutate = (param: Partial<Project>) => {
    return run(
      http(`projects`, {
        data: param,
        method: 'POST',
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
