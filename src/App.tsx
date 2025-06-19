
import './styles/main.scss';
import Sidebar from './components/Sidebar';
import { Navbar } from './components/Navbar';
import ProgressCard from './components/cards/ProgressCard';
import OverviewCards from './components/cards/OverviewCards';
import ProjectCard from './components/cards/ProjectCard';
import { mockProjects } from './mock/mockProjects';
import { mockUsers } from './mock/mockUsers';
import { mockTasks } from './mock/mockTasks';
import 'react-circular-progressbar/dist/styles.css';
import { UserProvider } from './contexts/UserContext';


function App() {

  const project = mockProjects[0];
  const project1 = mockProjects[1];
  const project2 = mockProjects[2];

  return (
    <div> 

          <Navbar />

      <div className='layout'>

          <Sidebar />

          <div className="container-fluid py-4 layout__layout-tasks">

                 <h1 className='welcome-user'>Hello there, <span className='welcome-user__highlight'>USER</span></h1>
        <div className='cards-stats'>


          <ProgressCard
          card={{
            title: "Completed",
            value: 42,
            icon: <span role="img" aria-label="tasks">✅</span>,
            percentage: 75,
          }}
        />
        <ProgressCard
          card={{
            title: "Active",
            value: 8,
            icon: <span role="img" aria-label="Active">📁</span>,
            percentage: -10,
          }}
        />
        <ProgressCard
          card={{
            title: "Projects",
            value: `23%`,
            icon: <span role="img" aria-label="projects">📁</span>,
            percentage: -10,
          }}
        />
        <ProgressCard
          card={{
            title: "Streak",
            value: `3 days`,
            icon: <span role="img" aria-label="projects">📁</span>,
            percentage: -10,
          }}
        />
        </div>

        <div className='cards-overview'>
          <OverviewCards></OverviewCards>
          <OverviewCards></OverviewCards>

        </div>

        <div className='cards-projects'>

          <ProjectCard project={project} tasks={mockTasks} participants={mockUsers}></ProjectCard>
          <ProjectCard project={project1} tasks={mockTasks} participants={mockUsers}></ProjectCard>
          <ProjectCard project={project2} tasks={mockTasks} participants={mockUsers}></ProjectCard>

     
        </div>


          </div>     
          
          </div>

     

      </div>

      
      
  );
}

export default App;