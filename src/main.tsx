import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import App from './App.tsx'
import Tasks from './pages/Tasks.tsx'
import Projects from './pages/Projects.tsx'
import Goals from './pages/Goals.tsx'
import Profile from './pages/Profile.tsx'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { UserProvider } from './contexts/UserContext.tsx'
import { AppDataProvider } from './contexts/AppDataContext.tsx'



const router = createBrowserRouter([

  {path : '/', element: <App />},
  {path : '/tasks', element: <Tasks />},
  {path : '/projects', element: <Projects />},
  {path : '/goals', element: <Goals />},
  {path : '/profile', element: <Profile />},
  {path : '*', element: <div>404 - Page Not Found</div>},

]);
  
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppDataProvider>
        <UserProvider>
          <RouterProvider router={router} />
      </UserProvider>
    </AppDataProvider>
  
  </StrictMode>,
)