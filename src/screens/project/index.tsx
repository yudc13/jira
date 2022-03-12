import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Kanban from '@/screens/kanban';
import Epic from '@/screens/epic';

const Project = () => {
  return (
    <div>
      <h3>Project</h3>
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        <Route element={<Navigate to={'kanban'} />} />
        <Route path={'kanban'} element={<Kanban />} />
        <Route path={'epic'} element={<Epic />} />
      </Routes>
    </div>
  );
};

export default Project;
