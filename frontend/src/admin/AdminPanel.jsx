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

  const authHeaders = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      fetchData();
    }
  }, [token]);

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
      await axios.put(`${API_BASE}/admin/profile`, profile, authHeaders);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  const updateExperienceField = (id, field, value) => {
    setExperience((prev) => prev.map((item) => (
      item.id === id ? { ...item, [field]: value } : item
    )));
  };

  const updateProjectField = (id, field, value) => {
    setProjects((prev) => prev.map((item) => (
      item.id === id ? { ...item, [field]: value } : item
    )));
  };

  const updatePublicationField = (id, field, value) => {
    setPublications((prev) => prev.map((item) => (
      item.id === id ? { ...item, [field]: value } : item
    )));
  };

  const handleAddExperience = () => {
    setExperience((prev) => ([
      {
        id: `draft-exp-${Date.now()}`,
        period: 'Month Year – Present',
        role: 'New Role',
        organization: 'Organization Name',
        location: 'Location',
        current: false,
        description: 'Short summary of this role',
        responsibilities: ['Responsibility 1', 'Responsibility 2']
      },
      ...prev
    ]));
  };

  const handleSaveExperience = async (item) => {
    try {
      await axios.post(`${API_BASE}/admin/experience`, item, authHeaders);
      await fetchData();
      alert('Experience saved!');
    } catch (error) {
      alert('Failed to save experience');
    }
  };

  const handleDeleteExperience = async (id) => {
    if (confirm('Delete this experience item?')) {
      try {
        await axios.delete(`${API_BASE}/admin/experience/${id}`, authHeaders);
        fetchData();
      } catch (error) {
        alert('Failed to delete');
      }
    }
  };

  const handleAddProject = () => {
    setProjects((prev) => ([
      {
        id: `draft-proj-${Date.now()}`,
        title: 'New Project Title',
        category: 'Research Category',
        shortDescription: 'One-line project summary',
        description: 'Detailed project description',
        status: 'In Progress',
        image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80',
        tags: ['Tag 1', 'Tag 2']
      },
      ...prev
    ]));
  };

  const handleSaveProject = async (item) => {
    try {
      await axios.post(`${API_BASE}/admin/projects`, item, authHeaders);
      await fetchData();
      alert('Project saved!');
    } catch (error) {
      alert('Failed to save project');
    }
  };

  const handleDeleteProject = async (id) => {
    if (confirm('Delete this project?')) {
      try {
        await axios.delete(`${API_BASE}/admin/projects/${id}`, authHeaders);
        await fetchData();
      } catch (error) {
        alert('Failed to delete project');
      }
    }
  };

  const handleAddPublication = () => {
    setPublications((prev) => ([
      {
        id: `draft-pub-${Date.now()}`,
        title: 'New Publication Title',
        authors: 'Author list',
        year: new Date().getFullYear(),
        journal: 'Journal / Conference',
        volume: '',
        pages: '',
        doi: '',
        type: 'journal',
        url: '',
        abstract: '',
        tags: ['tag']
      },
      ...prev
    ]));
  };

  const handleSavePublication = async (item) => {
    try {
      await axios.post(`${API_BASE}/admin/publications`, item, authHeaders);
      await fetchData();
      alert('Publication saved!');
    } catch (error) {
      alert('Failed to save publication');
    }
  };

  const handleDeletePublication = async (id) => {
    if (confirm('Delete this publication?')) {
      try {
        await axios.delete(`${API_BASE}/admin/publications/${id}`, authHeaders);
        await fetchData();
      } catch (error) {
        alert('Failed to delete publication');
      }
    }
  };

  const parseCommaList = (value) => value.split(',').map((x) => x.trim()).filter(Boolean);

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
              <label>Subtitle</label>
              <input
                type="text"
                value={profile.subtitle || ''}
                onChange={(e) => setProfile({...profile, subtitle: e.target.value})}
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
            <div className="grid-two">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  value={profile.email || ''}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  value={profile.phone || ''}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={profile.location || ''}
                onChange={(e) => setProfile({...profile, location: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Avatar URL (dummy image now, real photo later)</label>
              <input
                type="text"
                value={profile.avatar || ''}
                onChange={(e) => setProfile({...profile, avatar: e.target.value})}
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
                  <input
                    className="editor-input"
                    value={item.role || ''}
                    onChange={(e) => updateExperienceField(item.id, 'role', e.target.value)}
                  />
                  <input
                    className="editor-input"
                    value={item.organization || ''}
                    onChange={(e) => updateExperienceField(item.id, 'organization', e.target.value)}
                  />
                  <input
                    className="editor-input"
                    value={item.period || ''}
                    onChange={(e) => updateExperienceField(item.id, 'period', e.target.value)}
                  />
                  <textarea
                    className="editor-input"
                    rows={3}
                    value={item.description || ''}
                    onChange={(e) => updateExperienceField(item.id, 'description', e.target.value)}
                  />
                  <div className="card-actions">
                    <button onClick={() => handleSaveExperience(item)} className="save-btn">Save</button>
                    <button onClick={() => handleDeleteExperience(item.id)} className="delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="tab-content">
            <h2>Projects</h2>
            <button onClick={handleAddProject} className="add-btn">+ Add Project</button>
            <div className="items-list">
              {projects.map((item) => (
                <div key={item.id} className="item-card">
                  <input
                    className="editor-input"
                    value={item.title || ''}
                    onChange={(e) => updateProjectField(item.id, 'title', e.target.value)}
                  />
                  <input
                    className="editor-input"
                    value={item.category || ''}
                    onChange={(e) => updateProjectField(item.id, 'category', e.target.value)}
                  />
                  <input
                    className="editor-input"
                    value={item.status || ''}
                    onChange={(e) => updateProjectField(item.id, 'status', e.target.value)}
                  />
                  <input
                    className="editor-input"
                    value={item.image || ''}
                    onChange={(e) => updateProjectField(item.id, 'image', e.target.value)}
                  />
                  <textarea
                    className="editor-input"
                    rows={3}
                    value={item.shortDescription || ''}
                    onChange={(e) => updateProjectField(item.id, 'shortDescription', e.target.value)}
                  />
                  <input
                    className="editor-input"
                    value={(item.tags || []).join(', ')}
                    onChange={(e) => updateProjectField(item.id, 'tags', parseCommaList(e.target.value))}
                  />
                  <div className="card-actions">
                    <button onClick={() => handleSaveProject(item)} className="save-btn">Save</button>
                    <button onClick={() => handleDeleteProject(item.id)} className="delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'publications' && (
          <div className="tab-content">
            <h2>Publications</h2>
            <button onClick={handleAddPublication} className="add-btn">+ Add Publication</button>
            <div className="items-list">
              {publications.map((item) => (
                <div key={item.id} className="item-card">
                  <input
                    className="editor-input"
                    value={item.title || ''}
                    onChange={(e) => updatePublicationField(item.id, 'title', e.target.value)}
                  />
                  <input
                    className="editor-input"
                    value={item.authors || ''}
                    onChange={(e) => updatePublicationField(item.id, 'authors', e.target.value)}
                  />
                  <div className="grid-two">
                    <input
                      className="editor-input"
                      value={item.journal || ''}
                      onChange={(e) => updatePublicationField(item.id, 'journal', e.target.value)}
                    />
                    <input
                      className="editor-input"
                      type="number"
                      value={item.year || ''}
                      onChange={(e) => updatePublicationField(item.id, 'year', Number(e.target.value))}
                    />
                  </div>
                  <input
                    className="editor-input"
                    value={item.url || ''}
                    onChange={(e) => updatePublicationField(item.id, 'url', e.target.value)}
                  />
                  <textarea
                    className="editor-input"
                    rows={3}
                    value={item.abstract || ''}
                    onChange={(e) => updatePublicationField(item.id, 'abstract', e.target.value)}
                  />
                  <div className="card-actions">
                    <button onClick={() => handleSavePublication(item)} className="save-btn">Save</button>
                    <button onClick={() => handleDeletePublication(item.id)} className="delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
