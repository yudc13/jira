import useUrlQueryParam from '@/hooks/useUrlQueryParam';
import { useMemo } from 'react';

// 项目列表搜索参数
export const useProjectSearchParams = () => {
  const [params, setParams] = useUrlQueryParam(['name', 'personId']);
  const searchParams = useMemo(
    () => ({
      ...params,
      personId: Number(params.personId) || undefined,
    }),
    [params]
  );
  return [searchParams, setParams] as const;
};
