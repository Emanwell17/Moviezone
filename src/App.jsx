import React, { useState, useEffect } from 'react';
import logoSrc from './assets/logo.png';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Search, FolderDown, User, Play, Bookmark, Flame } from 'lucide-react';
import Home from './Home';
import Profile from './Profile';
import MyList from './MyList';
import Downloads from './Downloads';
import Premium from './Premium';
import Player from './Player';
import Auth from './Auth';
import SettingsPage from './SettingsPage';
import Explore from './Explore';
import MovieDetails from './MovieDetails';
import Admin from './Admin';
import { AppProvider, useAppContext } from './AppContext';
import { fetchSettingsPublic } from './api';
import './index.css';

// Application Routes Component

const BottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useAppContext();

  if (currentPath.startsWith('/player')) return null;
  if (currentPath.startsWith('/admin')) return null;
  if (currentPath === '/auth') return null;

  const navItems = user ? [
    { path: '/', label: 'Home', icon: <HomeIcon /> },
    { path: '/explore', label: 'Trending', icon: <Flame /> },
    { path: '/mylist', label: 'Watchlist', icon: <Bookmark /> },
    { path: '/downloads', label: 'Download', icon: <FolderDown /> },
    { path: '/profile', label: 'Profile', icon: <User /> }
  ] : [
    { path: '/', label: 'Home', icon: <HomeIcon /> },
    { path: '/explore', label: 'Trending', icon: <Flame /> },
    { path: '/mylist', label: 'Watchlist', icon: <Bookmark /> },
    { path: '/auth', label: 'Sign In', icon: <User /> }
  ];

  return (
    <nav className="desktop-sidebar mobile-bottom-nav">
      {navItems.map(item => (
        <Link to={item.path} key={item.path} className={`nav-link ${currentPath === item.path ? 'active' : ''}`}>
          {React.cloneElement(item.icon, { size: 24, className: 'icon' })}
          <span className="nav-label">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2400); // Allow animation to nearly finish
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-container">
      <img src={logoSrc} className="splash-logo" alt="MovieZone" />
    </div>
  );
};

const MaintenanceScreen = ({ siteName }) => (
  <div style={{ position: 'fixed', inset: 0, backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '20px', textAlign: 'center' }}>
    <img src={logoSrc} style={{ width: '80px', height: '80px', marginBottom: '24px' }} alt="Logo" />
    <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary-red)', marginBottom: '16px' }}>{siteName} Technical Update</h1>
    <p style={{ color: '#aaa', fontSize: '18px', maxWidth: '400px', lineHeight: '1.6' }}>
      We are currently performing scheduled maintenance to improve your cinematic experience.
      <br /><br />
      Please check back in a few minutes.
    </p>
    <div style={{ marginTop: '40px', padding: '10px 20px', borderRadius: '30px', border: '1px solid #333', color: '#555', fontSize: '12px' }}>
      ESTIMATED DOWNTIME: 15 MINUTES
    </div>
  </div>
);

const AppRoutes = () => {
  const { user } = useAppContext();

  return (
    <>
      <Routes>
        {/* Public — no login required */}
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/movie/:id/:slug" element={<MovieDetails />} />
        <Route path="/movie/:slug" element={<MovieDetails />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/player/:id/:slug" element={<Player />} />
        <Route path="/player/:slug" element={<Player />} />
        <Route path="/auth" element={user ? <Navigate to="/" replace /> : <Auth />} />
        {/* Login-required */}
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/mylist" element={user ? <MyList /> : <Navigate to="/auth" replace />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/auth" replace />} />
        <Route path="/settings/:topic" element={user ? <SettingsPage /> : <Navigate to="/auth" replace />} />
        <Route path="/admin" element={user?.role === 'admin' ? <Admin /> : <Navigate to="/" replace />} />
      </Routes>
      <BottomNav />
    </>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [maintenance, setMaintenance] = useState({ active: false, siteName: 'MovieZone' });

  useEffect(() => {
    fetchSettingsPublic().then(res => {
      if (res.status === 'success') {
        setMaintenance({ active: res.data.maintenanceMode, siteName: res.data.siteName });
      }
    });
  }, []);

  return (
    <AppProvider>
      <AppContent 
        showSplash={showSplash} 
        setShowSplash={setShowSplash} 
        maintenance={maintenance} 
      />
    </AppProvider>
  );
}

const AppContent = ({ showSplash, setShowSplash, maintenance }) => {
  const { user } = useAppContext();
  
  // Only show maintenance if user is NOT an admin
  const isMaintenanceActive = maintenance.active && user?.role !== 'admin';

  return (
    <>
      {isMaintenanceActive && <MaintenanceScreen siteName={maintenance.siteName} />}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <div className={(showSplash || isMaintenanceActive) ? 'fade-out' : ''}>
        <Router>
          <AppRoutes />
        </Router>
      </div>
    </>
  );
};
