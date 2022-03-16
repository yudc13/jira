import React from 'react';
import { Drawer } from 'antd';

import { useProjectModal } from '@/hooks/projects';

const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer visible={projectModalOpen} width={'100%'} onClose={close}>
      <h1>Project Modal</h1>
    </Drawer>
  );
};

export default ProjectModal;
