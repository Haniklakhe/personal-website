import { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Contact from './components/Contact';
import AdminPanel from './admin/AdminPanel';
import './App.css';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').trim();

function App() {
  const isAdminPage =
    window.location.pathname === '/admin' ||
    window.location.hash === '#/admin';

  if (isAdminPage) {
    return <AdminPanel />;
  }

  const [profile, setProfile] = useState(null);
  const [experience, setExperience] = useState(null);
  const [projects, setProjects] = useState(null);
  const [publications, setPublications] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, expRes, projRes, pubRes] = await Promise.all([
          axios.get(`${API_BASE}/profile`),
          axios.get(`${API_BASE}/experience`),
          axios.get(`${API_BASE}/projects`),
          axios.get(`${API_BASE}/publications`)
        ]);

        setProfile(profileRes.data);
        setExperience(expRes.data);
        setProjects(projRes.data);
        setPublications(pubRes.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <Navigation />
      <Hero profile={profile} />
      <About profile={profile} />
      <Experience items={experience} />
      <Projects items={projects} />
      <Publications items={publications} />
      <Contact profile={profile} />
      <footer className="footer">
        <p>&copy; 2026 Hanik Lakhe. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
