import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');

  // Dummy data for Sprint 5 visualization
  const stats = [
    { num: '1,248', label: 'Total Users', change: '+12% from last week', type: 's1' },
    { num: '3,412', label: 'CVs Generated', change: '+24% from last week', type: 's2' },
    { num: ' purple', label: 'Top Template', change: 'Used 1,840 times', type: 's3' },
    { num: '98.5%', label: 'Server Status', change: 'Active & Stable', type: 's4' }
  ];

  const recentUsers = [
    { id: '1', name: 'Nafisa Chowdhury', email: 'nafisa@gmail.com', cvs: 3, status: 'active' },
    { id: '2', name: 'Ramisa Tasnim', email: 'ramisa@gmail.com', cvs: 2, status: 'active' },
    { id: '3', name: 'Tanvir Ahmed', email: 'tanvir@gmail.com', cvs: 0, status: 'pending' },
    { id: '4', name: 'Nusrat Jahan', email: 'nusrat@gmail.com', cvs: 1, status: 'inactive' }
  ];

  const activities = [
    { text: 'Nafisa Chowdhury created a new Purple Template CV.', time: '5 mins ago', color: '' },
    { text: 'AI Feature: Grammar Fixer optimized user summary.', time: '12 mins ago', color: 'green' },
    { text: 'Ramisa Tasnim generated a modern Bold CV.', time: '45 mins ago', color: 'pink' },
    { text: 'New user registration completed.', time: '2 hours ago', color: '' }
  ];

  return (
    <div id="admin-dashboard">
      <div className="admin-layout">
        
        {/* ── SIDEBAR ── */}
        <aside className="admin-sidebar">
          <div className="admin-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            CV<span>ibe</span>
            <span className="admin-badge">Admin</span>
          </div>
          
          <ul className="sidebar-nav admin-sidebar-tabs">
            <li>
              <a 
                className={activeTab === 'Overview' ? 'active' : ''} 
                onClick={() => setActiveTab('Overview')}
              >
                <span className="nav-icon">📊</span> Overview
              </a>
            </li>
            <li>
              <a 
                className={activeTab === 'Users' ? 'active' : ''} 
                onClick={() => setActiveTab('Users')}
              >
                <span className="nav-icon">👥</span> Manage Users
              </a>
            </li>
            <li>
              <a 
                className={activeTab === 'CVs' ? 'active' : ''} 
                onClick={() => setActiveTab('CVs')}
              >
                <span className="nav-icon">📄</span> Total CVs
              </a>
            </li>
            <li>
              <a onClick={() => navigate('/dashboard')}>
                <span className="nav-icon">←</span> User Panel
              </a>
            </li>
          </ul>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="admin-content">
          
          {/* Topbar */}
          <div className="admin-topbar">
            <h1 className="admin-title">Admin Dashboard</h1>
            <div style={{ fontSize: '14px', color: 'var(--muted)' }}>
              Welcome back, Admin
            </div>
          </div>

          {/* Stats Grid */}
          <div className="admin-stats">
            {stats.map((stat, index) => (
              <div key={index} className={`astat ${stat.type}`}>
                <div className="astat-num">{stat.num}</div>
                <div className="astat-label">{stat.label}</div>
                <div className="astat-change">{stat.change}</div>
              </div>
            ))}
          </div>

          {/* 2-Column Split Layout */}
          <div className="admin-2col">
            
            {/* Left: User Management Table */}
            <div className="admin-table-wrap">
              <div className="table-hdr">
                <div className="table-title">Recent Registered Users</div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>CVs Created</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.cvs}</td>
                      <td>
                        <span className={`status-badge status-${user.status}`}>
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right: Live System Activity */}
            <div className="admin-panel">
              <div className="ap-title">
                <span>Live System Activity</span>
                <span style={{ fontSize: '11px', color: 'var(--accent3)' }}>● Live</span>
              </div>
              <div className="activity-list">
                {activities.map((act, index) => (
                  <div key={index} className="activity-item">
                    <div className={`activity-dot ${act.color}`}></div>
                    <div className="activity-content">
                      <div className="activity-text">{act.text}</div>
                      <div className="activity-time">{act.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </main>

      </div>
    </div>
  );
}