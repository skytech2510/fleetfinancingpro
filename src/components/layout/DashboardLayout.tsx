import React, { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Activity, CreditCard, DollarSign, FileText, Home, Settings, Users, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { PageTransition } from './PageTransition';
import { useAuth } from '../../contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', icon: Home, href: '/dashboard' },
  { name: 'Applications', icon: FileText, href: '/applications' },
  { name: 'Financing', icon: DollarSign, href: '/financing' },
  { name: 'Credit', icon: CreditCard, href: '/credit' },
  { name: 'Activity', icon: Activity, href: '/activity' },
  { name: 'Team', icon: Users, href: '/team' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const [buttonPosition, setButtonPosition] = useState(50); // Percentage from top
  const isDragging = useRef(false);
  const asideRef = useRef<HTMLElement>(null);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    e.preventDefault(); // Prevent text selection while dragging
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !asideRef.current) return;

    const asideRect = asideRef.current.getBoundingClientRect();
    const newPosition = ((e.clientY - asideRect.top) / asideRect.height) * 100;

    // Constrain the button position between 10% and 90% of the sidebar height
    const constrainedPosition = Math.max(10, Math.min(90, newPosition));
    setButtonPosition(constrainedPosition);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  // Cleanup event listeners
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        ref={asideRef}
        className={`fixed top-0 left-0 h-screen bg-card/95 backdrop-blur-2xl border-r border-primary/10 z-50 transition-all duration-300 
          ${isSidebarOpen ? 'w-72' : 'w-20'}`}
      >
        {/* Toggle Button */}
        <button
          onMouseDown={handleMouseDown}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{ top: `${buttonPosition}%` }}
          className={`absolute -right-3 -translate-y-1/2 w-[30px] h-[30px]
            bg-card/95 backdrop-blur-2xl
            border border-primary/10 
            rounded-full
            flex items-center justify-center
            hover:bg-primary/5 hover:border-primary/20
            transition-colors duration-300
            group cursor-pointer
            ${isSidebarOpen ? 'shadow-[4px_0_15px_rgba(0,0,0,0.1)]' : 'shadow-[2px_0_10px_rgba(0,0,0,0.1)]'}`}
        >
          {isSidebarOpen ? (
            <ChevronLeft className="w-4 h-4 text-primary/60 group-hover:text-primary/80 transition-colors duration-300" />
          ) : (
            <ChevronRight className="w-4 h-4 text-primary/60 group-hover:text-primary/80 transition-colors duration-300" />
          )}
        </button>

        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="h-16 flex items-center px-6 border-b border-primary/10">
            <h1 className={`gradient-text font-bold transition-all duration-300 ${isSidebarOpen ? 'text-2xl' : 'text-xl'}`}>
              {isSidebarOpen ? 'FleetFinancingPro' : 'FFP'}
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => `
                  flex items-center px-3 py-3 rounded-xl transition-all duration-300
                  hover-glow group relative
                  ${isActive 
                    ? 'bg-primary/20 text-primary border border-primary/20 neon-glow' 
                    : 'text-muted-foreground hover:text-primary-foreground'
                  }
                `}
              >
                <item.icon className="w-6 h-6 flex-shrink-0" />
                {isSidebarOpen && <span className="ml-3">{item.name}</span>}
              </NavLink>
            ))}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-3 rounded-xl transition-all duration-300
                text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border hover:border-destructive/20"
            >
              <LogOut className="w-6 h-6 flex-shrink-0" />
              {isSidebarOpen && <span className="ml-3">Logout</span>}
            </button>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-primary/10">
            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-medium text-primary">
                  {user?.full_name ? getInitials(user.full_name) : 'U'}
                </span>
              </div>
              {isSidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user?.full_name || 'User'}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email || 'user@example.com'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
        <div className="p-8">
          <div className="cyber-grid rounded-xl border border-primary/10 bg-card/50 backdrop-blur-sm p-6 min-h-[calc(100vh-4rem)]">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </div>
        </div>
      </main>
    </div>
  );
}