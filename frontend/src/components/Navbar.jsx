import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, GraduationCap, Phone } from "lucide-react";
import { SCHOOL } from "@/data/siteData";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/academics", label: "Academics" },
  { to: "/admissions", label: "Admissions" },
  { to: "/faculty", label: "Faculty" },
  { to: "/gallery", label: "Gallery" },
  { to: "/news", label: "News & Events" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-md" : "bg-white/80"
      } border-b border-slate-200/70`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" data-testid="nav-logo-link" className="flex items-center gap-3 group">
            <div className="grid place-items-center w-11 h-11 rounded-xl bg-[#0E1E38] text-amber-400 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-[#0E1E38] text-lg">{SCHOOL.short}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-amber-600 font-medium">Public School</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`nav-${l.label.toLowerCase().replace(/[^a-z]+/g, "-").replace(/(^-|-$)/g, "")}-link`}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive ? "text-amber-600" : "text-slate-700 hover:text-[#0E1E38] hover:bg-slate-100"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/admissions"
              data-testid="nav-apply-now-button"
              className="inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-400 text-[#0E1E38] font-semibold px-5 py-2.5 text-sm transition-all hover:shadow-lg hover:shadow-amber-500/30"
            >
              Apply Now
            </Link>
          </div>

          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-[#0E1E38]"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div data-testid="mobile-menu" className="lg:hidden bg-white border-t border-slate-200 animate-fade-up">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`mobile-nav-${l.label.toLowerCase().replace(/[^a-z]+/g, "-").replace(/(^-|-$)/g, "")}-link`}
                className={({ isActive }) =>
                  `px-3 py-3 rounded-lg font-medium ${isActive ? "bg-amber-50 text-amber-600" : "text-slate-700"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/admissions"
              data-testid="mobile-apply-now-button"
              className="mt-2 text-center rounded-full bg-amber-500 text-[#0E1E38] font-semibold px-5 py-3"
            >
              Apply Now
            </Link>
            <a href={`tel:${SCHOOL.phone}`} className="mt-1 flex items-center justify-center gap-2 text-sm text-slate-600 py-2">
              <Phone className="w-4 h-4" /> {SCHOOL.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
