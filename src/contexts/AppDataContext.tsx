import React from 'react'
import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { mockProjects } from '../mock/mockProjects'
import { mockTasks } from '../mock/mockTasks'
import { mockUsers } from '../mock/mockUsers'
import type { Project } from '../models/Project'
import type { User } from '../models/User'
import type { Task } from '../models/Task'


interface AppDataContextType {
  projects: Project[];
  tasks: Task[];
  users: User[];
}


interface AppDataProviderProps {
  children: ReactNode;
}

const AppDataContext = createContext<AppDataContextType>({
  projects: [],
  tasks: [],
  users: [],
});



export function AppDataProvider({ children }:AppDataProviderProps) {
 const [projects, setProjects] = useState<Project[]>([]);
const [tasks, setTasks] = useState<Task[]>([]);
const [users, setUsers] = useState<User[]>([]);


  useEffect(()=>{

    const loadOrSet = (key: any, mockData: any, setter: any) =>{

        const stored = localStorage.getItem(key)
        if(stored){

            setter(JSON.parse(stored) as Task[]);

        }else{

            localStorage.setItem(key, JSON.stringify(mockData));
            setter(mockData);
        }

    };

    loadOrSet('projects', mockProjects, setProjects);
    loadOrSet('tasks', mockTasks, setTasks);
    loadOrSet('users', mockUsers, setUsers);

  }, [])

  return (
    <AppDataContext.Provider value={{ projects, tasks, users }}>
      {children}
    </AppDataContext.Provider>
  );

}

export function useAppData() {
  return useContext(AppDataContext);
}