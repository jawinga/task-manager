  // Filter.tsx
  import React from 'react';
  import type { Task } from '../../models/Task';
  import type { Project } from '../../models/Project';
  import type { User } from '../../models/User';
  import TaskCard from '../cards/TaskCard';
  import { useAppData } from '../../contexts/AppDataContext';
  import { TaskDetailModal } from './TaskDetailModal';

  interface FilterProps {
    tasks: Task[];
    projects: Project[];
    users: User[];
    onSelectTask: (task: Task) => void;

  }


const Filter = ({ tasks, projects, users, onSelectTask }: FilterProps) => {
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);

  return (
    <div>
      {tasks.map((task) => {
        const project = projects.find((p) => p.id === task.projectId);
        const participants = users.filter((u) =>
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
            onClick={() => onSelectTask(task)}
          />
        );
      })}

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          isOpen={true}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};


  export default Filter;
