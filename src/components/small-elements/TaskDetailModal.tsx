import React from 'react';
import type { Task } from '../../models/Task';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from '@headlessui/react';

interface TaskDetailModalProps {
  task: Task;
  onClose: () => void;
  isOpen: boolean;
}

export const TaskDetailModal = ({ task, onClose, isOpen }: TaskDetailModalProps) => {
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
            {task.title}
          </DialogTitle>

          <div className="info-content space-y-2">
            <div className="info-item">
              <span className="info-label">Description:</span>
              <span className="info-value">{task.description || 'Not specified'}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Status:</span>
              <span className="info-value">{task.status}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Due Date:</span>
              <span className="info-value">{task.dueDate || 'Not set'}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Priority:</span>
              <span className="info-value">{task.priority}</span>
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
                {new Date(task.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="info-item">
              <span className="info-label">Updated At:</span>
              <span className="info-value">
                {new Date(task.updatedAt).toLocaleString()}
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
            <button
              type="button"
              className="modal-button"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default TaskDetailModal;
