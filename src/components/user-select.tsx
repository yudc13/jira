import { useUsers } from '@/hooks/users';
import IdSelect from '@/components/id-select';
import React from 'react';

const UserSelect = (
  props: Omit<React.ComponentProps<typeof IdSelect>, 'options'>
) => {
  const { data: users } = useUsers();
  return <IdSelect options={users || []} {...props} />;
};

export default UserSelect;
