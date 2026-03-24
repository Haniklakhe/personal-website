import { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').trim();

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [publications, setPublications] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('admin_token'));

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [profileRes, expRes, projRes, pubRes] = await Promise.all([
        axios.get(`${API_BASE}/profile`, { headers }),
        axios.get(`${API_BASE}/experience`, { headers }),
        axios.get(`${API_BASE}/projects`, { headers }),
        axios.get(`${API_BASE}/publications`, { headers })
      ]);
      
      setProfile(profileRes.data);
      setExperience(expRes.data);
      setProjects(projRes.data);
      setPublications(pubRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/admin/login`, { password });
      const newToken = res.data.token;
      localStorage.setItem('admin_token', newToken);
      setToken(newToken);
      setIsAuthenticated(true);
    } catch (error) {
      alert('Invalid password');
      setPassword('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
    setIsAuthenticated(false);
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put(`${API_BASE}/admin/profile`, profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  const handleAddExperience = async () => {
    const newItem = {
      role: prompt('Role:'),
      organization: prompt('Organization:'),
      period: prompt('Period:'),
      current: confirm('Currently working?')
    };
    
    if (newItem.role && newItem.organization) {
      try {
        await axios.post(`${API_BASE}/admin/experience`, newItem, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchData();
        alert('Experience added!');
      } catch (error) {
        alert('Failed to add experience');
      }
    }
  };

  const handleDeleteExperience = async (id) => {
    if (confirm('Delete this experience item?')) {
      try {
        await axios.delete(`${API_BASE}/admin/experience/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchData();
      } catch (error) {
        alert('Failed to delete');
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-card">
          <h1>Admin Panel Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>🎛️ Admin Panel - Content Management</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <nav className="admin-nav">
        <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
          Profile
        </button>
        <button className={activeTab === 'experience' ? 'active' : ''} onClick={() => setActiveTab('experience')}>
          Experience
        </button>
        <button className={activeTab === 'projects' ? 'active' : ''} onClick={() => setActiveTab('projects')}>
          Projects
        </button>
        <button className={activeTab === 'publications' ? 'active' : ''} onClick={() => setActiveTab('publications')}>
          Publications
        </button>
      </nav>

      <div className="admin-content">
        {activeTab === 'profile' && profile && (
          <div className="tab-content">
            <h2>Profile Information</h2>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                value={profile.firstName || ''}
                onChange={(e) => setProfile({...profile, firstName: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={profile.lastName || ''}
                onChange={(e) => setProfile({...profile, lastName: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={profile.title || ''}
                onChange={(e) => setProfile({...profile, title: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                value={profile.bio || ''}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                rows={4}
              />
            </div>
            <button onClick={handleUpdateProfile} className="save-btn">Save Profile</button>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="tab-content">
            <h2>Experience & Work History</h2>
            <button onClick={handleAddExperience} className="add-btn">+ Add Experience</button>
            <div className="items-list">
              {experience.map((item) => (
                <div key={item.id} className="item-card">
                  <h3>{item.role}</h3>
                  <p>{item.organization} ({item.period})</p>
                  <button onClick={() => handleDeleteExperience(item.id)} className="delete-btn">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="tab-content">
            <h2>Projects</h2>
            <div className="items-list">
              {projects.map((item) => (
                <div key={item.id} className="item-card">
                  <h3>{item.title}</h3>
                  <p>{item.category} - {item.status}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'publications' && (
          <div className="tab-content">
            <h2>Publications</h2>
            <div className="items-list">
              {publications.map((item) => (
                <div key={item.id} className="item-card">
                  <h3>{item.title}</h3>
                  <p>{item.journal} ({item.year})</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
