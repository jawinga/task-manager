import React from 'react'
import { Trash2 } from 'lucide-react';
import { Description, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import type { Task } from '../../models/Task';
import { useAppData } from '../../contexts/AppDataContext';


interface DeleteBtnProps {
  taskId: number;
}

const DeleteBtn = ({taskId}:DeleteBtnProps) => {

  const { tasks, setTasks } = useAppData();

  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  }

    function onDelete(taskId: number){

     tasks.find((task) => task.id === taskId);
     setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
     console.log(`Delete task with id: ${taskId}`);
     toggleOpen();
     localStorage.setItem('tasks', JSON.stringify(tasks.filter((task) => task.id !== taskId)));

  }

  return (
    <>
    
    <Trash2 onClick={toggleOpen} className='trash-icon'>DeleteBtn</Trash2>

      <Dialog open={isOpen} onClose={toggleOpen} className="dialog">
      <DialogBackdrop className="dialog-backdrop" />
      
      <div className="dialog-container">
        <DialogPanel className="dialog-panel">
          <div className="dialog-icon">
            <svg className="dialog-icon-svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
          </div>

          <div className="dialog-content">
            <DialogTitle className="dialog-title">
              Delete Task
            </DialogTitle>
            
            <div className="dialog-description">
              <p>Are you sure you want to delete this task?</p>
              <p>This action cannot be undone.</p>
            </div>
          </div>

          <div className="dialog-actions">
            <button
              type="button"
              className="dialog-button dialog-button--cancel"
              onClick={toggleOpen}
            >
              Cancel
            </button>
            <button
              type="button"
              className="dialog-button dialog-button--delete"
              onClick={() => onDelete(taskId)}
           >
              Delete
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>

    </>
  )
}

export default DeleteBtn