import useUrlQueryParam from '@/hooks/useUrlQueryParam';
import { useCallback, useMemo, useState } from 'react';
import { useProject } from '@/hooks/projects';

// 项目列表搜索参数
export const useProjectSearchParams = () => {
  const [searchKeys] = useState(['name', 'personId']);
  const [params, setParams] = useUrlQueryParam(
    searchKeys as ['name', 'personId']
  );
  const searchParams = useMemo(
    () => ({
      name: params.name === '' ? undefined : params.name,
      personId: Number(params.personId) || undefined,
    }),
    [params]
  );
  return [searchParams, setParams] as const;
};

export const useProjectModal = () => {
  const [{ projectModal, editingProjectId }, setProjectEditingModal] =
    useUrlQueryParam(['projectModal', 'editingProjectId']);

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const startEdit = useCallback(
    (id: number) => setProjectEditingModal({ editingProjectId: id }),
    [setProjectEditingModal]
  );

  const open = useCallback(
    () => setProjectEditingModal({ projectModal: true }),
    [setProjectEditingModal]
  );

  const close = useCallback(() => {
    console.log('close');
    setProjectEditingModal({
      editingProjectId: undefined,
      projectModal: undefined,
    });
  }, [setProjectEditingModal]);

  return {
    projectModalOpen: projectModal === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
