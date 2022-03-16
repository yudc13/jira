import React, { useEffect } from 'react';
import { Drawer, Spin, Form, Input, Button } from 'antd';

import { useProjectModal } from '@/screens/project-list/utils';
import UserSelect from '@/components/user-select';
import { useAddProject, useEditProject } from '@/hooks/projects';
import { ErrorBox } from '@/components/libs';
import styled from '@emotion/styled';

const { useForm } = Form;

const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal();
  const [form] = useForm();
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();

  const title = editingProject ? '编辑项目' : '创建项目';

  const onFinish = (values: any) => {
    console.log(editingProject, values);
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  const onClose = () => {
    form.resetFields();
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  return (
    <Drawer visible={projectModalOpen} width={'100%'} onClose={onClose}>
      <Container>
        {isLoading ? (
          <Spin size={'large'} />
        ) : (
          <>
            <ErrorBox error={error} />
            <h1>{title}</h1>
            <Form
              form={form}
              layout={'vertical'}
              style={{ width: '40rem' }}
              initialValues={{ personId: 0 }}
              onFinish={onFinish}
            >
              <Form.Item
                label={'项目'}
                name={'name'}
                rules={[{ required: true }]}
              >
                <Input placeholder={'请输入项目名称'} />
              </Form.Item>
              <Form.Item
                label={'部门'}
                name={'organization'}
                rules={[{ required: true }]}
              >
                <Input placeholder={'请输入部门'} />
              </Form.Item>
              <Form.Item label={'负责人'} name={'personId'}>
                <UserSelect defaultOptionName={'负责人'} />
              </Form.Item>
              <Form.Item style={{ textAlign: 'right' }}>
                <Button
                  loading={mutateLoading}
                  type={'primary'}
                  htmlType={'submit'}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default ProjectModal;
