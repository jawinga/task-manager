import React from 'react'
import type { Task } from '../../models/Task'
import type { Project } from '../../models/Project';
import type { User } from '../../models/User';
import UserProfiles from '../small-elements/UserProfiles';
import Request from '../buttons/Request';
import DropTaskState from '../small-elements/DropTaskState';



interface TaskCardProps{

    task: Task;
    project: Project;
    participants: User[];
    isAssignedToMe: boolean;
 
}



const TaskCard = ({task, project, participants, isAssignedToMe}:TaskCardProps) => {

const [state, setState] = React.useState<Task>(task);

  React.useEffect(()=>{

    setState(task);


  }, [state])
  
  return (
  <div className={`task-card ${isAssignedToMe ? 'task-card--assigned' : ''}`}>
  <div className="task-card__left">
    <div className="task-card__left-content">
      <div className="task-card__left-top">
        <h3 className="task-card__title">{task.title}</h3>
        <p className="task-card__project-name">{project.name}</p>
      </div>
      <div className="task-card__left-bottom">
        <p className="task-card__urgency">{
            
            task.priority === 'high' ? <span><img className='me-2' style={{ width: '20px', height: '20px', marginRight: '0.5rem' }} src="../../../public/urgent-icon.png"></img>High</span> :
            task.priority === 'medium' ? <span><img className='me-2' style={{ width: '20px', height: '20px', marginRight: '0.5rem' }} src="../../../public/medium-icon.png"></img> Medium</span> :
            <span><img className='me-2' style={{ width: '20px', height: '20px', marginRight: '0.5rem' }} src="../../../public/low-icon.png"></img> Low</span>
            }</p>
             Due: {new Date(task.dueDate).toLocaleDateString()}
      </div>
    </div>
  </div>

  <div className="task-card__right">
    <div className="task-card__right-content">
      <div className="task-card__right-bottom">
        <p className="task-card__status">


          {isAssignedToMe ? (
             <DropTaskState setState={setState} state={state} />
            ) : (
                <>
                 {task.status === "not-started" && <span className='card-status card-status--not-started'>Not started</span>}
                 {task.status === "in-progress" && <span className='card-status card-status--in-progress'>In progress</span>}
                   {task.status === "completed" && <span className='card-status card-status--completed'>Completed</span>}
                    {task.status === "stuck" && <span className='card-status card-status--stuck'>Stuck</span>}
                </>
          )}    

         
          {isAssignedToMe?"": <Request task={task}></Request>}
          
          
          </p>
           <div className="task-card__assignee">
                 {participants.length > 0 ? (
              <>
               <span>Assigned to:</span>
               <UserProfiles users={participants} />
                </>
            ) : (
              <p className="text-muted">No assignees</p>
                )}
                </div>
  
          </div>
    </div>
  </div>
</div>

  )
}

export default TaskCard