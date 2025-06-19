import React from 'react';
import type { Task } from '../../models/Task';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from '@headlessui/react';
import { PenLine } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { AppDataProvider, useAppData } from '../../contexts/AppDataContext';


interface TaskDetailModalProps {
  task: Task;
  onClose: () => void;
  isOpen: boolean;
}

export const TaskDetailModal = ({ task, onClose, isOpen }: TaskDetailModalProps) => {

  const {tasks, persistTasks } = useAppData();

  const { currentUserId } = useUser();

  const [editing, setEditing] = React.useState(false);
  const [formState, setFormState] = React.useState<Task>(task);

  return (
    <Dialog open={isOpen} onClose={onClose} className="modal-wrapper">
      <DialogBackdrop className="modal-overlay" />

      <div className="modal-container">
        <DialogPanel className="modal-panel modal-panel--wide">
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>

          <DialogTitle className="modal-title">
            {editing? (<input type="text" className="info-textarea" value={formState.title ||''} onChange={(e)=>setFormState({...formState, title: e.target.value})}></input>):(  task.title || 'Untitled Task'
        )}
            {task.assignedTo?.some((userId) => userId === currentUserId) ? <button onClick={()=>setEditing(prev=>!prev)} className='edit-btn'><PenLine></PenLine></button>: ''}
          </DialogTitle>

          <div className="info-content space-y-2">
            
          <div className="info-item">
              <span className="info-label">Description:</span>

              {editing ? (

                <textarea
                  className="info-textarea"
                  value={formState.description || ''}
                  onChange={(e) =>
                    setFormState({ ...formState, description: e.target.value })
                  }
                />

              ): (
                <span className="info-value">{task.description || 'Not specified'}</span>)}
        
            </div>

            <div className="info-item">
              <span className="info-label">Status:</span>

              {editing?(

                <select
                value={formState.status} onChange={(e)=>setFormState({...formState, status:e.target.value as Task['status']})} >
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option> 
                <option value="completed">Completed</option>
                <option value="stuck">Stuck</option>
              
                </select>


              ):(<span className="info-value">{task.status}</span>)}
            </div>

            <div className="info-item">
              <span className="info-label">Due Date:</span>
              {editing?(
                <input
                  type="date"
                  className="info-input"
                  value={task.dueDate || ''}
                  onChange={(e) =>
                    setFormState({ ...formState, dueDate: e.target.value })
                  }
                />
            ):( <span className="info-value">{task.dueDate || 'Not set'}</span>)}
            </div>

            <div className="info-item">
              <span className="info-label">Priority:</span>
              {editing? (

                  <select value={formState.priority}onChange={(e)=>setFormState({...formState, priority: e.target.value as Task['priority']})}>

                <option value="low">Low</option>
                <option value="medium">Medium</option> 
                <option value="high">High</option>
                <option value="critical">Critical</option>
                <option value="urgent">Urgent</option>
                <option value="stuck">Stuck</option>
      

                  </select>
               
              ):(<span className="info-value">{task.priority}</span>)}
            </div>

            <div className="info-item">
              <span className="info-label">Access:</span>
              <span className="info-value">{task.access}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Completed:</span>
              <span className="info-value">{task.completed ? 'Yes' : 'No'}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Pinned:</span>
              <span className="info-value">{task.pinned ? 'Yes' : 'No'}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Created At:</span>
              <span className="info-value">
                {task.createdAt? new Date(task.createdAt).toLocaleString(): null}
              </span>
            </div>

            <div className="info-item">
              <span className="info-label">Updated At:</span>
              <span className="info-value">
                {task.updatedAt? new Date(task.updatedAt).toLocaleString(): null}
              </span>
            </div>

            <div className="info-item">
              <span className="info-label">Assigned To:</span>
              <span className="info-value">
                {task.assignedTo && task.assignedTo.length > 0
                  ? task.assignedTo.join(', ')
                  : 'None'}
              </span>
            </div>
          </div>

          <div className="modal-actions mt-4">
  {editing ? (
    <>
      <button onClick={() => setEditing(prev => !prev)}>Cancel</button>
      <button
        type="button"
        className="modal-button"
        onClick={() => {
          persistTasks(tasks.map(t => t.id === task.id ? formState : t));
          setEditing(false);
          onClose();
        }}
      >
        Save and Close
      </button>
    </>
  ) : (
    <button
      type="button"
      className="modal-button"
      onClick={onClose}
    >
      Close
    </button>
  )}
</div>

        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default TaskDetailModal;
