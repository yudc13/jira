import { useState } from 'react';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import List from './list';
import SearchPanel, { Params } from './search-panel';
import useDebounce from '@/hooks/useDebounce';
import { useProject } from '@/hooks/projects';
import { useUsers } from '@/hooks/users';

const ProjectList = () => {
  const [params, setParams] = useState<Params>({ name: '', personId: '' });

  const debounceParams = useDebounce<Params>(params, 1000);

  const {
    isError,
    isLoading,
    error,
    data: projects,
  } = useProject(debounceParams);

  const { data: users } = useUsers();

  return (
    <Container>
      <SearchPanel
        params={params}
        users={users || []}
        setParams={(params) => setParams(params)}
      />
      {isError && (
        <Typography.Text type="danger">{error?.message}</Typography.Text>
      )}
      <List
        dataSource={projects || []}
        users={users || []}
        loading={isLoading}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectList;
