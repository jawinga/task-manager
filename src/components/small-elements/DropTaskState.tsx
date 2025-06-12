import React from 'react'
import type { Task } from '../../models/Task';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'


    interface DropTaskStateProps {

        state: Task;
        setState: (state: Task) => void;

    }

const statusoptions = [
    { value: 'not-started', label: 'Not Started' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'stuck', label: 'Stuck' },]    


const DropTaskState = ({state, setState}:DropTaskStateProps) => {
  return (
   /* {<select onChange={(e) => setState({...state, status:e.target.value as Task['status']})} className={`card-status card-status--${state.status}`}
>

        <option value="not-started">Not Started</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="stuck">Stuck</option>

    </select>}*/

        <Listbox value={state.status} onChange={(status) => setState({...state, status: status as Task['status'], }) }>

            <ListboxButton>{state.status.replace('-', ' ')}</ListboxButton>

        </Listbox>

  )
}

export default DropTaskState