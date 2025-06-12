import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import navBackground from '../assets/background-images/nav_background.png';
import { SearchBar } from './small-elements/SearchBar';
import { Cta } from './buttons/Cta';
import { Languages } from './buttons/Languages';
import { useAppData } from '../contexts/AppDataContext';

interface NavBarProps{

  isOpen:boolean;
  isOpenFunct: ()=>void;

}

export const Navbar = ({isOpen, isOpenFunct}:NavBarProps) => {
  const {projects, users, tasks} = useAppData();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  


  return (
    <nav
      className="nav navbar navbar-expand-lg"
      style={{
        padding: '1rem',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 100,
        backgroundImage: isScrolled ? `url(${navBackground})` : 'transparent',
        backgroundSize: '100% auto',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container-fluid justify-content-end">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="mainNavbar">
          <ul className="navbar-nav align-items-center">
            <li className="nav__item">
              <Link to="/" className="nav__element">Home</Link>
            </li>

            <li className="nav__item">
              <Link to="/tasks" className="nav__element">Tasks</Link>
              <div className="nav__hover">
                <div>New Task</div>
                <div>All Tasks</div>
              </div>
            </li>

            <li className="nav__item">
              <Link to="/projects" className="nav__element">Projects</Link>
              <div className="nav__hover">
                <div>New Project</div>
                <div>All Projects</div>
              </div>
            </li>

            <li className="nav__item">
              <Link to="/goals" className="nav__element">Goals</Link>
              <div className="nav__hover">
                <div>Weekly Goals</div>
                <div>All Goals</div>
              </div>
            </li>

            <li className="nav__item">
              <Link to="/profile" className="nav__element">Profile</Link>
              <div className="nav__hover">
                <div>Account Settings</div>
                <div>Logout</div>
              </div>
            </li>

            <li className="nav__item">
              <SearchBar />
            </li>

            <li className="nav__item">
              <Cta isOpen={isOpen} isOpenFunct={isOpenFunct} />
            </li>

            <li className="nav__item">
              <Languages />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
