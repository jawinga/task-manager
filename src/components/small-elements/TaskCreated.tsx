import React from 'react'
import { Button, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import type { Task } from '../../models/Task';

interface TaskCreatedProps {

  isTaskCreatedModal: boolean;
  setIsTaskCreatedModal?: (value: boolean) => void;
  task?: Task;


}

const TaskCreated = ({isTaskCreatedModal, setIsTaskCreatedModal, task}:TaskCreatedProps) => {

  return (
        <Dialog
      open={isTaskCreatedModal}
      onClose={() => setIsTaskCreatedModal && setIsTaskCreatedModal(false)}
      as="div"
      className="modal-wrapper"
    >
      <DialogBackdrop className="modal-overlay" />
      <div className="modal-container">
        <DialogPanel className="modal-panel">
          <DialogTitle as="h3" className="modal-title">
            Task Created!
          </DialogTitle>
            {task ? <h3>{task.title}</h3> : <p>Loading...</p>}
            {task ? <p>{task.dueDate}</p> : <p>Loading...</p>}
            {task ? <p>{task.priority}</p> : <p>Loading...</p>}
           {task?.assignedTo && task.assignedTo.length > 0 ? (
                <p>Assigned To: {task.assignedTo.join(', ')}</p>
                ) : (
                 <p>Assigned To: None</p>
                )}

      
          <div className="modal-actions">
            <Button className="modal-button" onClick={()=>setIsTaskCreatedModal?.(false)}>Close</Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default TaskCreated