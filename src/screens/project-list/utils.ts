import useUrlQueryParam from '@/hooks/useUrlQueryParam';
import { useMemo, useState } from 'react';

// 项目列表搜索参数
export const useProjectSearchParams = () => {
  const [searchKeys] = useState(['name', 'personId']);
  const [params, setParams] = useUrlQueryParam(
    searchKeys as ['name', 'personId']
  );
  const searchParams = useMemo(
    () => ({
      ...params,
      personId: Number(params.personId) || undefined,
    }),
    [params]
  );
  return [searchParams, setParams] as const;
};
