import React from 'react'
import {Button, Description, Dialog, DialogPanel, DialogTitle, DialogBackdrop, Field, Label, Input, Textarea, Select } from '@headlessui/react'
import { useState } from 'react'
import { useAppData } from '../../contexts/AppDataContext'


interface ModalProps {
  isOpen: boolean;
  isOpenFunct: ()=>void;
}



const Modal = ({isOpen, isOpenFunct}:ModalProps) => {

  const { tasks, projects, users } = useAppData();

  
  return (
   <Dialog open={isOpen} as="div" className="modal-wrapper" onClose={isOpenFunct}>
  <DialogBackdrop className="modal-overlay" />

  <div className="modal-container">
    <DialogPanel className="modal-panel">
      <DialogTitle as="h3" className="modal-title">
        Create Task
      </DialogTitle>
      
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
          multiple
          onChange={(e) => {
            // Count selected options
            const selectedCount = Array.from(e.target.selectedOptions).length;
            e.target.setAttribute('data-selected-count', selectedCount);
          }}
        >

          {users.map((user)=>{
            return (<option key={user.id}>{user.name}</option>
)
          })}
        </Select>
      </Field>

      <Field>
        <Label id="priority-label">Add priority</Label>
        <Select id="priority-select" required>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </Select>
      </Field>

      <div className="modal-actions">
        <Button id="submit-button" className="modal-button" onClick={isOpenFunct}>
          Add task
        </Button>
      </div>
    </DialogPanel>
  </div>
</Dialog>

        
  )
}

export default Modal  