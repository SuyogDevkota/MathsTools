import React, { useState, useEffect } from 'react';
import './Admin.css';

const API_BASE_URL = 'http://localhost:5000/api';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [files, setFiles] = useState([]);
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadForm, setUploadForm] = useState({
    file: null,
    category: 'books',
    subcategory: '',
    description: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      checkAuth(token);
    }
  }, []);

  const checkAuth = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsLoggedIn(true);
        loadDashboardData(token);
      } else {
        localStorage.removeItem('adminToken');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('adminToken');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        setUser(data.user);
        setIsLoggedIn(true);
        loadDashboardData(data.token);
        setMessage('Login successful!');
      } else {
        setMessage(data.error || 'Login failed');
      }
    } catch (error) {
      setMessage('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardData = async (token) => {
    try {
      const [statsRes, filesRes, usersRes] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE_URL}/files/all`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE_URL}/admin/users`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      if (filesRes.ok) {
        const filesData = await filesRes.json();
        setFiles(filesData.files || []);
      }

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData.users || []);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setUser(null);
    setFiles([]);
    setStats({});
    setUsers([]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!uploadForm.file) {
      setMessage('Please select a file');
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', uploadForm.file);
    formData.append('category', uploadForm.category);
    formData.append('subcategory', uploadForm.subcategory);
    formData.append('description', uploadForm.description);

    try {
      const response = await fetch(`${API_BASE_URL}/files/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('File uploaded successfully!');
        setUploadForm({
          file: null,
          category: 'books',
          subcategory: '',
          description: ''
        });
        loadDashboardData(localStorage.getItem('adminToken'));
      } else {
        setMessage(data.error || 'Upload failed');
      }
    } catch (error) {
      setMessage('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileDelete = async (fileId) => {
    if (!window.confirm('Are you sure you want to delete this file?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/files/${fileId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (response.ok) {
        setMessage('File deleted successfully!');
        loadDashboardData(localStorage.getItem('adminToken'));
      } else {
        const data = await response.json();
        setMessage(data.error || 'Delete failed');
      }
    } catch (error) {
      setMessage('Delete failed. Please try again.');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <h2>Admin Login</h2>
          {message && <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-info">
          <span>Welcome, {user?.username}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      {message && <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</div>}

      <div className="admin-tabs">
        <button 
          className={activeTab === 'dashboard' ? 'active' : ''} 
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={activeTab === 'files' ? 'active' : ''} 
          onClick={() => setActiveTab('files')}
        >
          Files
        </button>
        <button 
          className={activeTab === 'upload' ? 'active' : ''} 
          onClick={() => setActiveTab('upload')}
        >
          Upload
        </button>
        <button 
          className={activeTab === 'users' ? 'active' : ''} 
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Files</h3>
                <p>{stats.stats?.totalFiles || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Active Files</h3>
                <p>{stats.stats?.activeFiles || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Total Users</h3>
                <p>{stats.stats?.totalUsers || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Admins</h3>
                <p>{stats.stats?.totalAdmins || 0}</p>
              </div>
            </div>

            <div className="recent-uploads">
              <h3>Recent Uploads</h3>
              <div className="uploads-list">
                {stats.recentUploads?.map((file) => (
                  <div key={file._id} className="upload-item">
                    <span>{file.originalName}</span>
                    <span>{file.category}</span>
                    <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'files' && (
          <div className="files-management">
            <h3>File Management</h3>
            <div className="files-list">
              {files.map((file) => (
                <div key={file._id} className="file-item">
                  <div className="file-info">
                    <h4>{file.originalName}</h4>
                    <p>Category: {file.category}</p>
                    <p>Size: {formatFileSize(file.size)}</p>
                    <p>Uploaded: {new Date(file.uploadedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="file-actions">
                    <button 
                      onClick={() => handleFileDelete(file._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="upload-section">
            <h3>Upload New File</h3>
            <form onSubmit={handleFileUpload} className="upload-form">
              <div className="form-group">
                <label>File:</label>
                <input
                  type="file"
                  onChange={(e) => setUploadForm({...uploadForm, file: e.target.files[0]})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category:</label>
                <select
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm({...uploadForm, category: e.target.value})}
                >
                  <option value="books">Books</option>
                  <option value="olympiad">Olympiad</option>
                  <option value="practice">Practice</option>
                  <option value="teachersguide">Teachers Guide</option>
                  <option value="teacherstools">Teachers Tools</option>
                </select>
              </div>
              <div className="form-group">
                <label>Subcategory:</label>
                <input
                  type="text"
                  value={uploadForm.subcategory}
                  onChange={(e) => setUploadForm({...uploadForm, subcategory: e.target.value})}
                  placeholder="Optional"
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                  placeholder="Optional description"
                />
              </div>
              <button type="submit" disabled={loading}>
                {loading ? 'Uploading...' : 'Upload File'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-management">
            <h3>User Management</h3>
            <div className="users-list">
              {users.map((user) => (
                <div key={user._id} className="user-item">
                  <div className="user-info">
                    <h4>{user.username}</h4>
                    <p>Role: {user.role}</p>
                    <p>Created: {new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin; 