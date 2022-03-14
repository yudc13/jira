import React from 'react';
import { Popover, Typography, List, Divider } from 'antd';
import styled from '@emotion/styled';
import { useProject } from '@/hooks/projects';
import { ButtonNoPadding } from '@/components/libs';
import { useDispatch } from 'react-redux';
import { projectListActions } from '@/screens/project-list/project-list.slice';

const ProjectPopover = () => {
  const dispatch = useDispatch();
  const { data } = useProject();
  const pinProjects = data?.filter((project) => project.pin);
  const content = (
    <ContentContainer>
      <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
      <List>
        {pinProjects?.map((item) => (
          <List.Item key={item.id}>
            <List.Item.Meta title={item.name} />
          </List.Item>
        ))}
      </List>
      <Divider style={{ marginTop: 0 }} />
      <ButtonNoPadding
        type={'link'}
        onClick={() => dispatch(projectListActions.openProjectModal())}
      >
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <Popover placement={'bottom'} content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;

export default ProjectPopover;
