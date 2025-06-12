// Filter.tsx
import React from 'react';
import type { Task } from '../../models/Task';
import type { Project } from '../../models/Project';
import type { User } from '../../models/User';
import TaskCard from '../cards/TaskCard';

interface FilterProps {
  tasks: Task[];
  projects: Project[];
  users: User[];
}

const Filter = ({ tasks, projects, users }: FilterProps) => {

  console.log(tasks);  
  return (
    <div>
      {tasks.map((task) => {
        const project = projects.find(p => p.id === task.projectId);
        const participants = users.filter(u =>
          (task.assignedTo || []).includes(u.id)
        );

        if (!project) return null;

        return (
          <TaskCard
            key={task.id}
            task={task}
            project={project}
            participants={participants}
            isAssignedToMe={false}
          />
        );
      })}
    </div>
  );
};

export default Filter;
