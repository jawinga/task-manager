import React, { useContext } from 'react'
import type { Card } from '../../models/Card'
import type { Task } from '../../models/Task';
import type { Project } from '../../models/Project';
import type { User } from '../../models/User';
import { useUser } from '../../contexts/UserContext';
import TaskCard from '../cards/TaskCard';

interface YourTasksProps {

    tasks: Task[];
    projects: Project[];
    users: User[];

}


const YourTasks = ({tasks, projects, users}:YourTasksProps) => {

    const { currentUserId } = useUser();

    const myTasks = tasks.filter(task => task.assignedTo?.includes(currentUserId));

  return (

    <>

    {myTasks.length === 0 &&
      <div className="text-center text-gray-500">
        You have no tasks assigned.
      </div>
    }


      <div>
      {myTasks.map(task => {
          const project = projects.find(p => p.id === task.projectId);
          if (!project) return null;

        const participants = users.filter(u =>
          (task.assignedTo || []).includes(u.id)
        );

        return (
          <TaskCard
            key={task.id}
            task={task}
            project={project}
            participants={participants}
            isAssignedToMe={true}
          />
        );
      })}
    </div>
    
    </>
  
  )
}

export default YourTasks