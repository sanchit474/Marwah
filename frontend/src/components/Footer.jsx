import { Link } from "react-router-dom";
import { GraduationCap, MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from "lucide-react";
import { SCHOOL } from "@/data/siteData";

const quick = [
  { to: "/about", label: "About Us" },
  { to: "/academics", label: "Academics" },
  { to: "/admissions", label: "Admissions" },
  { to: "/faculty", label: "Faculty" },
  { to: "/gallery", label: "Gallery" },
  { to: "/news", label: "News & Events" },
];

export const Footer = () => {
  return (
    <footer data-testid="site-footer" className="bg-[#0E1E38] text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="grid place-items-center w-11 h-11 rounded-xl bg-amber-500 text-[#0E1E38]">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="font-display font-bold text-white text-lg leading-tight">{SCHOOL.short}<br /><span className="text-xs font-normal tracking-widest text-amber-400 uppercase">Public School</span></div>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">{SCHOOL.tagline}</p>
          <p className="text-xs text-slate-500 mt-3">{SCHOOL.affiliation} · Estd. {SCHOOL.estd}</p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#!" data-testid={`footer-social-${i}`} className="grid place-items-center w-9 h-9 rounded-lg bg-white/10 hover:bg-amber-500 hover:text-[#0E1E38] transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-white text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {quick.map((q) => (
              <li key={q.to}>
                <Link to={q.to} className="text-slate-400 hover:text-amber-400 transition-colors">{q.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-white text-lg mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex gap-3"><MapPin className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" /> {SCHOOL.address}</li>
            <li className="flex gap-3"><Phone className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" /> {SCHOOL.phone}</li>
            <li className="flex gap-3"><Mail className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" /> {SCHOOL.email}</li>
            <li className="flex gap-3"><Clock className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" /> {SCHOOL.hours}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-white text-lg mb-4">Admissions Open</h4>
          <p className="text-sm text-slate-400 mb-4">Applications for 2026-27 are now open for Nursery to Grade 11.</p>
          <Link to="/admissions" data-testid="footer-apply-button" className="inline-flex rounded-full bg-amber-500 hover:bg-amber-400 text-[#0E1E38] font-semibold px-5 py-2.5 text-sm transition-colors">
            Start Application
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {SCHOOL.name}. All rights reserved.</p>
          <Link to="/admin" data-testid="footer-admin-link" className="hover:text-amber-400 transition-colors">Admin Portal</Link>
        </div>
      </div>
    </footer>
  );
};
