import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { deleteAdminUser, getAdminCVs, getAdminStats, getAdminUsers } from '../utils/adminApi';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout, user: currentUser } = useAuth(); 
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [stats, setStats] = useState({
    totalUsers: 0,
    cvsCreated: 0,
    downloads: 0,
    aiUses: 0
  });
  const [users, setUsers] = useState([]);
  const [cvList, setCvList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes, cvsRes] = await Promise.all([
        getAdminStats(),
        getAdminUsers(),
        getAdminCVs()
      ]);

      if (statsRes?.data) {
        setStats({
          totalUsers: statsRes.data.totalUsers || 0,
          cvsCreated: statsRes.data.cvsCreated || 0,
          downloads: statsRes.data.downloads || 0,
          aiUses: statsRes.data.aiUses || 0
        });
      }

      if (usersRes?.data) setUsers(usersRes.data);
      if (cvsRes?.data) setCvList(cvsRes.data);

    } catch (err) {
      console.error("Error fetching admin dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteAdminUser(userId);
        setUsers(users.filter(user => user.id !== userId));
        setStats(prev => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Failed to delete user.");
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f0f0f8] font-sans flex flex-col md:flex-row">
      
      {/* ── MOBILE HEADER ── */}
      <header className="md:hidden w-full bg-[#0d0d12] border-b border-[#1f1f2e] px-6 py-5 flex items-center justify-between sticky top-0 z-50">
        <Link to="/" className="font-['Bebas_Neue'] text-2xl tracking-[2px] text-white hover:opacity-80 transition-opacity no-underline">
          CV<span className="text-[#7c5cfc]">ibe</span>
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-1 text-2xl text-white focus:outline-none"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* ── SIDEBAR ── */}
      <aside className={`
        w-64 bg-[#0d0d12] border-r border-[#1f1f2e] py-8 flex flex-col fixed top-[68px] md:top-0 bottom-0 left-0 z-40 shrink-0 transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
      `}>
        <div className="hidden md:block px-8 pb-8 border-b border-[#1f1f2e] mb-6">
          <Link to="/" className="font-['Bebas_Neue'] text-3xl tracking-[2px] text-white hover:opacity-80 transition-opacity no-underline block">
            CV<span className="text-[#7c5cfc]">ibe</span> 
          </Link>
        </div>
        
        <ul className="flex-1 p-0 m-0 space-y-1 list-none">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'users', label: 'Users', icon: '👥' },
            { id: 'cvs', label: 'All CVs', icon: '📄' },
            { id: 'settings', label: 'Settings', icon: '⚙️' }
          ].map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-4 py-3.5 px-8 text-base font-medium transition-all text-left border-l-[3px] cursor-pointer ${
                  activeTab === tab.id 
                    ? 'text-white bg-[rgba(124,92,252,0.08)] border-[#7c5cfc]' 
                    : 'text-[#7070a0] border-transparent hover:text-white hover:bg-[rgba(124,92,252,0.04)]'
                }`}
              >
                <span className="inline-block w-6 text-lg text-center">{tab.icon}</span> 
                <span>{tab.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 md:hidden top-[68px]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 p-6 sm:p-8 md:p-10 overflow-y-auto md:ml-64 w-full max-w-[1500px] mx-auto">

        {loading ? (
          <div className="flex items-center justify-center h-[60vh] text-base text-[#7070a0]">
            <span className="tracking-wide animate-pulse">Loading real-time dashboard analytics...</span>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-[#1f1f2e]/50">
              <div className="font-['Bebas_Neue'] text-4xl sm:text-5xl tracking-[2px] text-white">
                {activeTab === 'overview' && 'DASHBOARD'}
                {activeTab === 'users' && 'ALL USERS'}
                {activeTab === 'cvs' && 'ALL CVS'}
                {activeTab === 'settings' && 'SETTINGS'}
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#7c5cfc] shadow-[0_0_15px_rgba(124,92,252,0.4)] flex items-center justify-center text-sm font-bold text-white select-none uppercase">
                  {currentUser?.name ? currentUser.name.charAt(0) : 'A'}
                </div>

   
                <span className="text-base font-semibold text-[#f0f0f8] tracking-wide hidden sm:inline">
                  {currentUser?.name || 'Admin'}
                </span>

                <button 
                  onClick={handleLogout}
                  className="bg-transparent hover:bg-[#7c5cfc]/10 border border-[#1f1f2e] hover:border-[#7c5cfc] text-[#7070a0] hover:text-[#7c5cfc] text-sm font-medium px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer focus:outline-none"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* ── OVERVIEW TAB ── */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                  {[
                    { num: stats.totalUsers, label: 'Total Users', icon: '👥' },
                    { num: stats.cvsCreated, label: 'CVs Created', icon: '📄' },
                    { num: stats.downloads, label: 'Downloads', icon: '⬇️' },
                    { num: stats.aiUses, label: 'AI Uses', icon: '✦' }
                  ].map((item, i) => (
                    <div key={i} className="bg-[#0d0d12] border border-[#1f1f2e] rounded-[16px] p-6 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-[#7c5cfc]">
                      <div className="absolute text-2xl top-5 right-5 opacity-20">{item.icon}</div>
                      <div className="font-['Bebas_Neue'] text-4xl sm:text-5xl tracking-[1px] text-white mb-2">{item.num}</div>
                      <div className="text-sm font-medium text-[#7070a0] uppercase tracking-wider">{item.label}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#0d0d12] border border-[#1f1f2e] rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6 text-base font-bold tracking-wide text-white">
                    Recent Users 
                    <span className="text-sm text-[#7c5cfc] font-semibold cursor-pointer hover:underline transition-all" onClick={() => setActiveTab('users')}>View all →</span>
                  </div>
                  <div className="w-full overflow-x-auto">
                    {users.length === 0 ? (
                      <div className="text-center py-12 text-base text-[#7070a0] font-medium tracking-wide">
                        No dynamic users found in database.
                      </div>
                    ) : (
                      <table className="w-full border-collapse min-w-[550px]">
                        <thead>
                          <tr className="border-b border-[#1f1f2e]">
                            <th className="px-5 py-4 text-left text-xs font-bold tracking-wider uppercase text-[#7070a0] bg-[#14141f]/50 rounded-l-xl">Name</th>
                            <th className="px-5 py-4 text-left text-xs font-bold tracking-wider uppercase text-[#7070a0] bg-[#14141f]/50">Email</th>
                            <th className="px-5 py-4 text-left text-xs font-bold tracking-wider uppercase text-[#7070a0] bg-[#14141f]/50 rounded-r-xl">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1f1f2e]">
                          {users.slice(0, 5).map((user, idx) => (
                            <tr key={user.id || idx} className="hover:bg-[rgba(124,92,252,0.03)] transition-colors">
                              <td className="px-5 py-4.5 text-base font-semibold text-white">{user.name}</td>
                              <td className="px-5 py-4.5 text-base text-[#7070a0]">{user.email}</td>
                              <td className="px-5 py-4.5 text-base">
                                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                                  user.status === 'active' ? 'bg-[rgba(92,252,184,0.1)] text-[#4ade80]' : 'bg-neutral-800 text-gray-400'
                                }`}>{user.status || 'active'}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── USERS TAB ── */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="bg-[#0d0d12] border border-[#1f1f2e] rounded-2xl overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-[#1f1f2e] gap-4">
                    <div className="text-base font-bold tracking-wide text-white">Registered Users ({filteredUsers.length})</div>
                    <input 
                      className="w-full sm:w-64 bg-[#14141f] border border-[#1f1f2e] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#7c5cfc] transition-colors" 
                      placeholder="Search users..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="w-full overflow-x-auto">
                    {filteredUsers.length === 0 ? (
                      <div className="text-center py-16 text-base text-[#7070a0] font-medium">No users found matching query.</div>
                    ) : (
                      <table className="w-full border-collapse min-w-[650px]">
                        <thead>
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold tracking-wider uppercase text-[#7070a0] bg-[#14141f]/40 border-b border-[#1f1f2e]">Name</th>
                            <th className="px-6 py-4 text-left text-xs font-bold tracking-wider uppercase text-[#7070a0] bg-[#14141f]/40 border-b border-[#1f1f2e]">Email</th>
                            <th className="px-6 py-4 text-left text-xs font-bold tracking-wider uppercase text-[#7070a0] bg-[#14141f]/40 border-b border-[#1f1f2e]">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-bold tracking-wider uppercase text-[#7070a0] bg-[#14141f]/40 border-b border-[#1f1f2e]">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1f1f2e]">
                          {filteredUsers.map((user, idx) => (
                            <tr key={user.id || idx} className="hover:bg-[rgba(124,92,252,0.03)] transition-colors">
                              <td className="px-6 py-4.5 text-base font-semibold text-white">{user.name}</td>
                              <td className="px-6 py-4.5 text-base text-[#7070a0]">{user.email}</td>
                              <td className="px-6 py-4.5 text-base">
                                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                                  user.status === 'active' ? 'bg-[rgba(92,252,184,0.1)] text-[#4ade80]' : 'bg-neutral-800 text-gray-400'
                                }`}>{user.status || 'active'}</span>
                              </td>
                              <td className="px-6 py-4.5 text-base">
                                <button 
                                  className="text-sm font-semibold text-red-400/90 hover:text-red-400 transition-colors cursor-pointer flex items-center gap-1.5" 
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  🗑️ <span>Delete</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── CVS TAB ── */}
            {activeTab === 'cvs' && (
              <div className="space-y-6">
                <div className="bg-[#0d0d12] border border-[#1f1f2e] rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-[#1f1f2e] text-base font-bold text-white tracking-wide">Created CVs ({cvList.length})</div>
                  <div className="w-full overflow-x-auto">
                    {cvList.length === 0 ? (
                      <div className="text-center py-16 text-base text-[#7070a0] font-medium">No live CVs generated yet.</div>
                    ) : (
                      <table className="w-full border-collapse min-w-[650px]">
                        <thead>
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold tracking-wider uppercase text-[#7070a0] bg-[#14141f]/40 border-b border-[#1f1f2e]">CV Title / Objective</th>
                            <th className="px-6 py-4 text-left text-xs font-bold tracking-wider uppercase text-[#7070a0] bg-[#14141f]/40 border-b border-[#1f1f2e]">Template ID</th>
                            <th className="px-6 py-4 text-left text-xs font-bold tracking-wider uppercase text-[#7070a0] bg-[#14141f]/40 border-b border-[#1f1f2e]">User ID</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1f1f2e]">
                          {cvList.map((cv, idx) => (
                            <tr key={cv.id || idx} className="hover:bg-[rgba(124,92,252,0.03)] transition-colors">
                              <td className="px-6 py-4.5 text-base font-semibold text-white truncate max-w-xs">{cv.title || cv.objective || 'Untitled CV'}</td>
                              <td className="px-6 py-4.5 text-base text-[#7070a0]">{cv.templateId || 'Default'}</td>
                              <td className="px-6 py-4.5 text-base text-white font-medium">{cv.userId || cv.user_id}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── SETTINGS TAB ── */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-[#0d0d12] border border-[#1f1f2e] rounded-2xl p-6 sm:p-8 max-w-xl w-full">
                  <div className="mb-6 text-base font-bold tracking-wide text-white">Admin System Management</div>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-[#7070a0] mb-2 uppercase tracking-wider">Dashboard Status</label>
                      <input className="w-full bg-[#14141f] border border-[#1f1f2e] rounded-xl px-5 py-3.5 text-base font-medium text-green-400 focus:outline-none" value="Connected to Server (MySQL)" disabled />
                    </div>
                    <button 
                      onClick={fetchDashboardData}
                      className="w-full sm:w-auto bg-[#7c5cfc] hover:bg-[#6949e2] text-white text-base font-semibold px-6 py-3.5 rounded-xl transition-colors mt-2 cursor-pointer shadow-lg shadow-[#7c5cfc]/10"
                    >
                      🔄 Force Sync Now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

      </main>

    </div>
  );
}