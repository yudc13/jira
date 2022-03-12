import { useHttp } from '@/utils/http';
import useAsync from '@/hooks/useAsync';
import { Params } from '@/screens/project-list/search-panel';
import { Project } from '@/screens/project-list/list';
import { clearObject } from '@/utils';
import { useEffect } from 'react';

export const useProject = (params?: Params) => {
  const http = useHttp();
  const { run, data, isLoading, isError, error } = useAsync<Project[]>();
  useEffect(() => {
    run(http<Project[]>('projects', { data: clearObject(params || []) }));
    // eslint-disable-next-line
  }, [params]);
  return {
    data,
    isError,
    isLoading,
    error,
  };
};

export const useEditProject = () => {
  const { run, ...rest } = useAsync();
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
    rest,
  };
};
