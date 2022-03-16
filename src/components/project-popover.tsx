import React from 'react';
import { Popover, Typography, List, Divider } from 'antd';
import styled from '@emotion/styled';
import { useProjects } from '@/hooks/projects';
import { useProjectModal } from '@/screens/project-list/utils';
import { ButtonNoPadding } from '@/components/libs';

const ProjectPopover = () => {
  const { open } = useProjectModal();
  const { data } = useProjects();
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
      <ButtonNoPadding type={'link'} onClick={open}>
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
