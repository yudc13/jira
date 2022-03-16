import styled from '@emotion/styled';
import List from './list';
import SearchPanel, { Params } from './search-panel';
import useDebounce from '@/hooks/useDebounce';
import { useProjects } from '@/hooks/projects';
import { useUsers } from '@/hooks/users';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import { useProjectSearchParams } from '@/screens/project-list/utils';
import { ErrorBox } from '@/components/libs';

const ProjectList = () => {
  useDocumentTitle('项目列表');

  const [params, setParams] = useProjectSearchParams();

  const debounceParams = useDebounce<Params>(params, 1000);

  const { isLoading, error, data: projects } = useProjects(debounceParams);

  const { data: users } = useUsers();

  return (
    <Container>
      <SearchPanel params={params} setParams={(params) => setParams(params)} />
      <ErrorBox error={error} />
      <List
        dataSource={projects || []}
        users={users || []}
        loading={isLoading}
      />
    </Container>
  );
};

ProjectList.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectList;
