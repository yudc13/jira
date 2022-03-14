import React from 'react';
import { Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  projectListActions,
  selectProjectModalOpen,
} from '@/screens/project-list/project-list.slice';

const ProjectModal = () => {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalOpen);
  return (
    <Drawer
      visible={projectModalOpen}
      width={'100%'}
      onClose={() => dispatch(projectListActions.closeProjectModal())}
    >
      <h1>Project Modal</h1>
    </Drawer>
  );
};

export default ProjectModal;
