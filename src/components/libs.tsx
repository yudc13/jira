import styled from '@emotion/styled';
import { Typography, Spin } from 'antd';

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? 'space-between' : undefined)};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === 'number'
        ? `${props.gap}rem`
        : props.gap
        ? '2rem'
        : undefined};
  }
`;

export const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullLoadingPage = () => {
  return (
    <FullPage>
      <Spin size={'large'} />
    </FullPage>
  );
};

export const FullErrorPage = ({ error }: { error: Error | null }) => {
  return (
    <FullPage>
      <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
    </FullPage>
  );
};
