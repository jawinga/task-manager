import React, { useMemo } from 'react'
import {Button, Description, Dialog, DialogPanel, DialogTitle, DialogBackdrop, Field, Label, Input, Textarea, Select } from '@headlessui/react'
import { useState, useEffect } from 'react'
import { useAppData } from '../../contexts/AppDataContext'
import type { User } from '../../models/User'
import type { Task } from '../../models/Task'


interface ModalProps {
  isOpen: boolean;
  isOpenFunct: ()=>void;
}



const Modal = ({isOpen, isOpenFunct}:ModalProps) => {

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<Task>({
  id: Date.now(), 
  projectId: 0,
  title: '',
  description: '',
  status: 'not-started',
  assignedTo: [],
  dueDate: '',
  priority: 'low',
  categories: [],
  completed: false,
  pinned: false,
  access: 'private',
  privateAttachments: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
  const [formError, setFormError] = useState<string | null>(null);

  const { tasks, projects, users } = useAppData();

  useMemo(()=>{
  console.log('Selected count:', selectedUsers.length);
  console.log('Selected names:', selectedUsers.map((user) => user.name));
  },[selectedUsers])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null); // reset previous error
    const formData = new FormData(e.currentTarget);

    const requiredFields = ['title', 'description', 'project', 'date', 'priority'];
    const values: Record<string, string> = {};

    for (const field of requiredFields) {
       const value = formData.get(field);
           if (!value || value.toString().trim() === '') {
               setFormError(`"${field}" is required`);
               return;
           }
           
      values[field] = value.toString();
    }

    const participants = selectedUsers.map(user => user.id);

    const newTask: Task = {
      id: Date.now(),
      title: values.title,
      description: values.description,
      projectId: projects.find(p => p.name === values.project)?.id || 0,
      dueDate: values.date,
      priority: values.priority,
      assignedTo: participants,
      status: 'not-started',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log("✅ New task created:", newTask);
    isOpenFunct(); // Close modal
  };

  
  return (
   <Dialog open={isOpen} as="div" className="modal-wrapper" onClose={isOpenFunct}>
  <DialogBackdrop className="modal-overlay" />

  <div className="modal-container">
    <DialogPanel className="modal-panel">
      <DialogTitle as="h3" className="modal-title">
        Create Task
      </DialogTitle>

      <form action={handleSubmit}>

      <Field>
        <Label id="title-label" className="modal-description">Add a title</Label>
        <Input id="title-input" type='text' name='title' placeholder='Do HR Accounting' required />
      </Field>

      <Field>
        <Label id="description-label" className="modal-description">Add a description</Label>
        <Textarea id="description-textarea" name='description' placeholder='...' required/>
      </Field>

      <Field>
        <Label id="project-label">Add to Project - {projects.length}</Label>
        <Select id="project-select" required>
          <option value="">--Please choose an option--</option>
          {projects.map((project)=>{
            return(
              <option key={project.id}>{project.name}</option>
            )
          })}
        </Select>
      </Field>

      <Field>
        <Label id="date-label">Select due date</Label>
        <Input id="date-input" type='date' required />
      </Field>

      <Field id="participants-field">
        <Label id="participants-label">Add participants - {users.length}</Label>
        <Select 
          id="participants-select" 
          multiple={true}
          onChange={(e) => {
          const selectedIds = Array.from(e.target.selectedOptions).map(option => option.value);
          const selectedUser = users.filter(user=>selectedIds.includes(user.id))
          setSelectedUsers(selectedUser)
           
          }}
        >
          {users.map((user)=>{
            return (<option key={user.id} value={user.id}>{user.name}</option>
          )
          })}
        </Select>
      </Field>

      <Field>
        <Label id="priority-label">Add priority</Label>
        <Select id="priority-select" required>
            <option value="">--Please choose an option--</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
            <option value="stuck">Stuck</option>

        </Select>
      </Field>

      <div className="modal-actions">
        <Button id="submit-button" className="modal-button" onClick={isOpenFunct}>
          Add task
        </Button>
      </div>

      </form>
    </DialogPanel>
  </div>
</Dialog>
     
  )
}

export default Modal  