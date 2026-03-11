import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, Package, ShoppingCart, ClipboardList,
  Users, Settings, LogOut, Store, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

const adminNav = [
  { to: '/dashboard',  icon: LayoutDashboard, label: 'Dashboard'  },
  { to: '/produits',   icon: Package,          label: 'Produits'   },
  { to: '/ventes',     icon: ShoppingCart,     label: 'Ventes'     },
  { to: '/inventaire', icon: ClipboardList,    label: 'Inventaire' },
  { to: '/agents',     icon: Users,            label: 'Agents'     },
  { to: '/parametres', icon: Settings,         label: 'Paramètres' },
];

const agentNav = [
  { to: '/dashboard',  icon: LayoutDashboard, label: 'Dashboard'  },
  { to: '/produits',   icon: Package,          label: 'Produits'   },
  { to: '/ventes',     icon: ShoppingCart,     label: 'Ventes'     },
  { to: '/inventaire', icon: ClipboardList,    label: 'Inventaire' },
  { to: '/parametres', icon: Settings,         label: 'Paramètres' },
];

export default function Sidebar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const navItems = isAdmin ? adminNav : agentNav;

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <aside
      className={`
        sidebar-bg sticky top-0 z-40 flex flex-col transition-all duration-300 ease-in-out h-screen flex-shrink-0
        ${collapsed ? 'w-[68px]' : 'w-[230px]'}
      `}
    >
      {/* ── Logo ───────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-3 py-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        {!collapsed ? (
          <>
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
              >
                <Store className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-sm text-white leading-tight">BoutiqueFood</p>
                <p className="text-[10px]" style={{ color: '#86efac' }}>Gestion alimentaire</p>
              </div>
            </div>
            <button
              onClick={() => setCollapsed(true)}
              className="p-1 rounded-md transition text-emerald-200 hover:bg-white/10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 w-full">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            >
              <Store className="w-5 h-5 text-white" />
            </div>
            <button
              onClick={() => setCollapsed(false)}
              className="p-1 rounded-md transition text-emerald-200 hover:bg-white/10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* ── Navigation ─────────────────────────────── */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {!collapsed && (
          <p
            className="text-[10px] font-semibold uppercase tracking-widest px-3 mb-3"
            style={{ color: '#bbf7d0' }}
          >
            {isAdmin ? 'Administration' : 'Navigation'}
          </p>
        )}
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            title={collapsed ? item.label : undefined}
            className={({ isActive }) => `block`}
          >
            {({ isActive }) => (
              <div
                className={`
                  relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium
                  ${collapsed ? 'justify-center' : ''}
                  ${isActive ? 'sidebar-link active shadow-md' : 'sidebar-link'}
                `}
              >
                {/* Indicateur actif */}
                {isActive && !collapsed && (
                  <div
                    className="absolute left-0 w-1 h-6 rounded-r-full bg-emerald-500"
                  />
                )}
                <item.icon
                  className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-emerald-300'}`}
                />
                {!collapsed && (
                  <span className={isActive ? 'text-white font-semibold' : ''}>{item.label}</span>
                )}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Utilisateur ────────────────────────────── */}
      <div className="mt-auto sticky bottom-0 px-2 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        {!collapsed && (
          <div
            className="flex items-center gap-2.5 px-3 py-2 mb-2 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
              style={{ background: '#22c55e', color: '#fff' }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate leading-tight">{user?.name}</p>
              <p className="text-[10px] truncate" style={{ color: '#86efac' }}>
                {user?.role === 'admin' ? 'Administrateur' : 'Agent vendeur'}
              </p>
            </div>
          </div>
        )}

        {collapsed && (
          <div className="flex justify-center mb-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
              style={{ background: '#22c55e', color: '#fff' }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          title={collapsed ? 'Déconnexion' : undefined}
          className={`
            flex items-center gap-3 w-full px-3 py-2.5 rounded-xl
            transition-all text-sm font-medium text-rose-300 hover:bg-rose-500/15
            ${collapsed ? 'justify-center' : ''}
          `}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
}
