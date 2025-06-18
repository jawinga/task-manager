import React from 'react';
import type { Task } from '../../models/Task';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';

interface DropTaskStateProps {
  state: Task;
  setState: (state: Task) => void;
}

const statusoptions = [
  { value: 'not-started', label: 'Not Started' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'stuck', label: 'Stuck' },
];

const DropTaskState = ({ state, setState }: DropTaskStateProps) => {
  return (
    <div className="dropdown-wrapper">
      <Listbox
        value={state.status}
        onChange={(status) =>
          setState({ ...state, status: status as Task['status'] })
        }
      >
        <ListboxButton className={`card-status card-status--${state.status}`}>
          {statusoptions.find((opt) => opt.value === state.status)?.label ??
            state.status}
        </ListboxButton>

        <ListboxOptions className="dropdown-options">
          {statusoptions.map((option) => (
            <ListboxOption
              key={option.value}
              value={option.value}
              className={({ active, selected }) => {
                let classNames = 'dropdown-option';
                if (active) classNames += ' active';
                if (selected) classNames += ' selected';
                return classNames;
              }}
            >
              {option.label}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};

export default DropTaskState;
