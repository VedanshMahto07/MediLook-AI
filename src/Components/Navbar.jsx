import { useState } from "react";
import { 
  HeartPulse, 
  Menu, 
  X, 
  Bot, 
  Pill, 
  Activity, 
  Stethoscope, 
  Leaf, 
  Calculator,
  ChevronRight,
  ShieldAlert
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Medicines", path: "/medicine", icon: Pill },
    { name: "Diseases", path: "/disease", icon: Activity },
    { name: "Symptoms", path: "/symptoms", icon: Stethoscope },
    { name: "Remedies", path: "/remedies", icon: Leaf },
    { name: "AI Doctor", path: "/doctor", icon: Bot, },
    { name: "Health Tools", path: "/health-tools", icon: Calculator },
  ];

  return (
    <>
      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <HeartPulse size={22} className="text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold text-slate-900 tracking-tight">
                  MediLook
                </span>
                <span className="px-2 py-0.5 text-xs font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded-md">
                  AI
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1.5 text-sm font-semibold">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || 
                (link.path !== "/" && location.pathname.startsWith(link.path));
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "text-emerald-700 bg-emerald-50 font-bold shadow-xs"
                      : "text-slate-600 hover:text-emerald-700 hover:bg-slate-100/70"
                  }`}
                >
                  {link.highlight && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  )}
                  {link.name}
                </NavLink>
              );
            })}
          </div>

          {/* Desktop Right CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/doctor"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold shadow-sm hover:bg-emerald-700 transition-all duration-200 active:scale-95"
            >
              <Bot size={18} />
              <span>Ask AI Doctor</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/doctor"
              className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              title="Ask AI Doctor"
            >
              <Bot size={20} />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-1.5 shadow-xl animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path || 
                (link.path !== "/" && location.pathname.startsWith(link.path));
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? "bg-emerald-50 text-emerald-800 font-bold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {Icon && (
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? "bg-emerald-200/60 text-emerald-800" : "bg-slate-100 text-slate-500"}`}>
                        <Icon size={18} />
                      </div>
                    )}
                    <span>{link.name}</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </NavLink>
              );
            })}
            <div className="pt-3">
              <Link
                to="/doctor"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 text-white font-bold text-base shadow-md"
              >
                <Bot size={18} />
                <span>Start AI Doctor Consultation</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;