import React, { useMemo } from 'react';
import { useAppData } from '../contexts/AppDataContext';
import '../styles/main.scss';
import Sidebar from '../components/Sidebar';
import {Navbar} from '../components/Navbar';
import TaskCard from '../components/cards/TaskCard';
import { mockTasks } from '../mock/mockTasks';
import { mockProjects } from '../mock/mockProjects';
import type { Task } from '../models/Task';
import type { Project } from '../models/Project';
import type { User } from '../models/User';
import { mockUsers } from '../mock/mockUsers';
import Filter from '../components/small-elements/Filter';
import { filter } from 'framer-motion/client';
import Dropdown from '../components/small-elements/Dropdown';
import YourTasks from '../components/small-elements/YourTasks';
import SortDropdown from '../components/small-elements/SortDropdown';
import DropTaskState from '../components/small-elements/DropTaskState';
import Modal from '../components/small-elements/Modal';

interface FilterProps{
  tasks: Task[];
}


function Tasks() {

const { tasks, projects, users } = useAppData();
console.log('Tasks from context:', tasks);
const [filter, setFilter] = React.useState<string>('all');
const [sort, setSort] = React.useState<string>('any');

const [isOpen, setIsOpen] = React.useState(false)

 function isOpenFunct(){
    setIsOpen(prev => !prev);
  }



const visibleTasks = useMemo(() => {
  const filtered = filter === 'all'
    ? tasks
    : tasks.filter(task => task.status === filter);

  if (sort === 'due-date') {
    return [...filtered].sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  }



  if (sort === 'priority') {
   
  }

  return filtered;
}, [tasks, filter, sort]);

console.log(visibleTasks.length);
console.log('Modal open state:', isOpen);



  return (
    <div> 


          <Navbar isOpen={isOpen} isOpenFunct={isOpenFunct} />

      <div className='layout'>

          <Sidebar />

  <div className="container-fluid py-4 layout__layout-tasks">
    <div className='row'>
      
    </div>

  <div className='head-tasks'>
      <h1 className="welcome-user__highlight mb-4">Tasks</h1>
      <h3 className="silver-gradient">Your active tasks</h3>
      <br></br>

      <YourTasks tasks={tasks} projects={projects} users={users} />

      <br></br>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '1rem' }}>

        <Dropdown filter={filter} setFilter={setFilter} />
        <SortDropdown sort={sort} setSort={setSort}></SortDropdown>

      </div>

    </div>  

  <div className="row">

<Filter tasks={visibleTasks} projects={projects} users={users} />


  
  </div>
</div>


      </div>

        {isOpen && <Modal isOpen={isOpen} isOpenFunct={isOpenFunct} />}


        </div>

      
      
  );
}

export default Tasks;