import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navigation from './components/Navigation';
import AdminPanel from './admin/AdminPanel';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import PublicationsPage from './pages/PublicationsPage';
import ContactPage from './pages/ContactPage';
import './App.css';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').trim();

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  const [profile, setProfile] = useState(null);
  const [experience, setExperience] = useState(null);
  const [projects, setProjects] = useState(null);
  const [publications, setPublications] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdminPage) {
      setLoading(false);
      return;
    }

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
  }, [isAdminPage]);

  if (isAdminPage) {
    return <AdminPanel />;
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app multipage-app">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<HomePage profile={profile} experience={experience} projects={projects} publications={publications} />}
          />
          <Route path="/about" element={<AboutPage profile={profile} />} />
          <Route path="/experience" element={<ExperiencePage experience={experience} />} />
          <Route path="/projects" element={<ProjectsPage projects={projects} />} />
          <Route path="/publications" element={<PublicationsPage publications={publications} />} />
          <Route path="/contact" element={<ContactPage profile={profile} />} />
          <Route path="*" element={<HomePage profile={profile} experience={experience} projects={projects} publications={publications} />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>&copy; 2026 Hanik Lakhe. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
