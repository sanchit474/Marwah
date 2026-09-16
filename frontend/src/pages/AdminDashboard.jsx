import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { toast } from "sonner";
import {
  GraduationCap, LogOut, Users, MessageSquare, Newspaper, ClipboardCheck,
  Search, Loader2, RefreshCw, Trash2, Eye, X, Save,
  CheckCircle2, Clock, XCircle, AlertCircle,
} from "lucide-react";
import { SCHOOL } from "@/data/siteData";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

/* ─── helpers ───────────────────────────────────────────────── */
const STATUS_MAP = {
  pending: { label: "Pending", variant: "amber", icon: Clock },
  contacted: { label: "Contacted", variant: "slate", icon: AlertCircle },
  admitted: { label: "Admitted", variant: "green", icon: CheckCircle2 },
  rejected: { label: "Rejected", variant: "red", icon: XCircle },
};
const STATUS_OPTIONS = ["pending", "contacted", "admitted", "rejected"];

function StatusBadge({ status }) {
  const s = STATUS_MAP[status] ?? STATUS_MAP.pending;
  const colors = {
    amber: "bg-amber-100 text-amber-800",
    slate: "bg-slate-100 text-slate-700",
    green: "bg-emerald-100 text-emerald-800",
    red: "bg-red-100 text-red-700",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${colors[s.variant]}`}>
      <s.icon className="w-3 h-3" /> {s.label}
    </span>
  );
}

/* ─── mock local store (when backend is unreachable) ────────── */
let mockAdmissions = [
  { id: 1, student_name: "Aryan Mehta", parent_name: "Suresh Mehta", email: "suresh@example.com", phone: "+91 99001 12345", grade: "Grade 5", status: "pending", created_at: "2026-09-01T10:00:00Z" },
  { id: 2, student_name: "Priya Sharma", parent_name: "Neha Sharma", email: "neha@example.com", phone: "+91 98201 54321", grade: "Grade 9", status: "contacted", created_at: "2026-09-05T14:30:00Z" },
  { id: 3, student_name: "Rohan Gupta", parent_name: "Anil Gupta", email: "anil@example.com", phone: "+91 97501 67890", grade: "Grade 11", status: "admitted", created_at: "2026-09-08T09:15:00Z" },
];

let mockContacts = [
  { id: 1, name: "Kavita Singh", email: "kavita@example.com", phone: "+91 98765 11111", role: "Parent", subject: "Fee Related", message: "Please share the fee structure for Grade 7.", status: "unread", created_at: "2026-09-10T08:00:00Z" },
  { id: 2, name: "Deepak Joshi", email: "deepak@example.com", phone: "", role: "Alumni", subject: "Other", message: "Is there an alumni network I can join?", status: "read", created_at: "2026-09-12T16:45:00Z" },
];

let mockNews = [
  { id: 1, title: "Class XII achieves 100% CBSE pass rate", tag: "Achievement", date: "2026-09-10", body: "For the 12th consecutive year, our board results are outstanding." },
  { id: 2, title: "New Robotics & AI Lab inaugurated", tag: "Facility", date: "2026-08-28", body: "30 workstations with Arduino and Raspberry Pi now available to students." },
];

/* ─── Stat Card ─────────────────────────────────────────────── */
function StatCard({ label, value, icon: Icon, color, testid }) {
  return (
    <div data-testid={testid} className={`rounded-2xl p-6 border ${color} bg-white flex items-center gap-4`}>
      <div className="grid place-items-center w-12 h-12 rounded-xl bg-current/10 shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="font-display text-3xl font-bold text-[#0E1E38]">{value}</div>
        <div className="text-sm text-slate-500 mt-0.5">{label}</div>
      </div>
    </div>
  );
}

/* ─── Main Dashboard ────────────────────────────────────────── */
export default function AdminDashboard() {
  const { user, checking, logout } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState("admissions");
  const [admissions, setAdmissions] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Admissions filters
  const [admSearch, setAdmSearch] = useState("");
  const [admStatus, setAdmStatus] = useState("all");

  // Detail modals
  const [viewAdm, setViewAdm] = useState(null);
  const [viewContact, setViewContact] = useState(null);

  // News form
  const [newsForm, setNewsForm] = useState({ title: "", tag: "General", date: "", body: "" });
  const [editingNews, setEditingNews] = useState(null);
  const [newsLoading, setNewsLoading] = useState(false);

  /* auth guard */
  useEffect(() => {
    if (!checking && !user) navigate("/admin/login");
  }, [checking, user, navigate]);

  /* fetch data */
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [a, c, n] = await Promise.all([
        api.get("/admin/admissions"),
        api.get("/admin/contacts"),
        api.get("/admin/news"),
      ]);
      setAdmissions(a.data);
      setContacts(c.data);
      setNews(n.data);
    } catch {
      // Backend unreachable — use mock data
      setAdmissions(mockAdmissions);
      setContacts(mockContacts);
      setNews(mockNews);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) fetchAll();
  }, [user, fetchAll]);

  /* ── admissions ── */
  const filteredAdm = admissions.filter((a) => {
    const q = admSearch.toLowerCase();
    const matchQ = !q || a.student_name?.toLowerCase().includes(q) || a.parent_name?.toLowerCase().includes(q) || a.grade?.toLowerCase().includes(q);
    const matchS = admStatus === "all" || a.status === admStatus;
    return matchQ && matchS;
  });

  const updateAdmStatus = async (id, status) => {
    try {
      await api.patch(`/admin/admissions/${id}`, { status });
    } catch {
      // mock fallback
      mockAdmissions = mockAdmissions.map((a) => a.id === id ? { ...a, status } : a);
    }
    setAdmissions((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
    if (viewAdm?.id === id) setViewAdm((a) => ({ ...a, status }));
    toast.success("Status updated.");
  };

  const deleteAdm = async (id) => {
    if (!window.confirm("Delete this enquiry? This cannot be undone.")) return;
    try {
      await api.delete(`/admin/admissions/${id}`);
    } catch {
      mockAdmissions = mockAdmissions.filter((a) => a.id !== id);
    }
    setAdmissions((prev) => prev.filter((a) => a.id !== id));
    toast.success("Enquiry deleted.");
    setViewAdm(null);
  };

  /* ── contacts ── */
  const markContactRead = async (id) => {
    try {
      await api.patch(`/admin/contacts/${id}`, { status: "read" });
    } catch {
      mockContacts = mockContacts.map((c) => c.id === id ? { ...c, status: "read" } : c);
    }
    setContacts((prev) => prev.map((c) => c.id === id ? { ...c, status: "read" } : c));
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await api.delete(`/admin/contacts/${id}`);
    } catch {
      mockContacts = mockContacts.filter((c) => c.id !== id);
    }
    setContacts((prev) => prev.filter((c) => c.id !== id));
    toast.success("Message deleted.");
    setViewContact(null);
  };

  /* ── news ── */
  const submitNews = async (e) => {
    e.preventDefault();
    if (!newsForm.title || !newsForm.body) { toast.error("Title and body are required."); return; }
    setNewsLoading(true);
    try {
      if (editingNews) {
        try {
          const { data } = await api.put(`/admin/news/${editingNews.id}`, newsForm);
          setNews((prev) => prev.map((n) => n.id === editingNews.id ? data : n));
        } catch {
          mockNews = mockNews.map((n) => n.id === editingNews.id ? { ...n, ...newsForm } : n);
          setNews(mockNews);
        }
        toast.success("News updated.");
      } else {
        try {
          const { data } = await api.post("/admin/news", newsForm);
          setNews((prev) => [data, ...prev]);
        } catch {
          const item = { id: Date.now(), ...newsForm };
          mockNews = [item, ...mockNews];
          setNews(mockNews);
        }
        toast.success("News item published.");
      }
      setNewsForm({ title: "", tag: "General", date: "", body: "" });
      setEditingNews(null);
    } finally {
      setNewsLoading(false);
    }
  };

  const startEditNews = (n) => {
    setEditingNews(n);
    setNewsForm({ title: n.title, tag: n.tag, date: n.date, body: n.body });
  };

  const deleteNews = async (id) => {
    if (!window.confirm("Delete this news item?")) return;
    try {
      await api.delete(`/admin/news/${id}`);
    } catch {
      mockNews = mockNews.filter((n) => n.id !== id);
    }
    setNews((prev) => prev.filter((n) => n.id !== id));
    toast.success("News item deleted.");
    if (editingNews?.id === id) { setEditingNews(null); setNewsForm({ title: "", tag: "General", date: "", body: "" }); }
  };

  /* ── stats ── */
  const stats = {
    totalAdm: admissions.length,
    pendingAdm: admissions.filter((a) => a.status === "pending").length,
    unreadContacts: contacts.filter((c) => c.status === "unread").length,
    newsCount: news.length,
  };

  if (checking || (!user && !loading)) return null;

  return (
    <div className="min-h-screen bg-[#FDFBF7]" data-testid="admin-dashboard">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid place-items-center w-9 h-9 rounded-lg bg-[#0E1E38] text-amber-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-[#0E1E38] text-sm">{SCHOOL.short}</div>
              <div className="text-[10px] uppercase tracking-widest text-amber-600">Admin Panel</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              data-testid="admin-refresh-button"
              onClick={fetchAll}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
              title="Refresh data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <span className="text-sm text-slate-600 hidden sm:block">{user?.email}</span>
            <Link to="/" data-testid="admin-visit-site-link" className="text-xs text-slate-500 hover:text-amber-600 transition-colors hidden sm:block">
              View site
            </Link>
            <button
              data-testid="admin-logout-button"
              onClick={() => { logout(); navigate("/admin/login"); }}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard testid="stat-total-admissions" label="Total Enquiries" value={stats.totalAdm} icon={Users} color="border-blue-200" />
          <StatCard testid="stat-pending-admissions" label="Pending" value={stats.pendingAdm} icon={ClipboardCheck} color="border-amber-200" />
          <StatCard testid="stat-unread-contacts" label="Unread Messages" value={stats.unreadContacts} icon={MessageSquare} color="border-purple-200" />
          <StatCard testid="stat-news-count" label="News Items" value={stats.newsCount} icon={Newspaper} color="border-emerald-200" />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-slate-200 p-1 rounded-xl w-fit mb-6" role="tablist">
          {[
            { key: "admissions", label: "Admissions", icon: Users },
            { key: "contacts", label: "Messages", icon: MessageSquare },
            { key: "news", label: "News & Events", icon: Newspaper },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              role="tab"
              data-testid={`admin-tab-${key}`}
              onClick={() => setTab(key)}
              aria-selected={tab === key}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === key ? "bg-[#0E1E38] text-white" : "text-slate-600 hover:bg-slate-50"}`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-[#0E1E38]" />
          </div>
        ) : (
          <>
            {/* ── Admissions tab ── */}
            {tab === "admissions" && (
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-100 flex flex-wrap gap-3 items-center">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      data-testid="admin-adm-search"
                      value={admSearch}
                      onChange={(e) => setAdmSearch(e.target.value)}
                      placeholder="Search by name or grade..."
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0E1E38]"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["all", ...STATUS_OPTIONS].map((s) => (
                      <button
                        key={s}
                        data-testid={`admin-status-filter-${s}`}
                        onClick={() => setAdmStatus(s)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${admStatus === s ? "bg-[#0E1E38] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                      >
                        {s === "all" ? "All" : STATUS_MAP[s].label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        {["Student", "Parent", "Grade", "Phone", "Status", "Date", ""].map((h, i) => (
                          <th key={i} className="text-left px-4 py-3 text-xs uppercase tracking-wider text-slate-500 font-semibold whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredAdm.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-12 text-slate-400">No enquiries found.</td>
                        </tr>
                      ) : (
                        filteredAdm.map((a, i) => (
                          <tr key={a.id} data-testid={`admin-enquiry-table-row-${i}`} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 font-medium text-[#0E1E38]">{a.student_name}</td>
                            <td className="px-4 py-3 text-slate-600">{a.parent_name}</td>
                            <td className="px-4 py-3 text-slate-600">{a.grade}</td>
                            <td className="px-4 py-3 text-slate-600">{a.phone}</td>
                            <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                            <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{new Date(a.created_at).toLocaleDateString("en-IN")}</td>
                            <td className="px-4 py-3">
                              <button
                                data-testid={`admin-view-enquiry-${i}`}
                                onClick={() => setViewAdm(a)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-[#0E1E38] hover:bg-slate-100 transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── Contacts tab ── */}
            {tab === "contacts" && (
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                <div className="p-4 border-b border-slate-100">
                  <h3 className="font-display text-lg font-semibold text-[#0E1E38]">Contact Messages ({contacts.length})</h3>
                </div>
                {contacts.length === 0 ? (
                  <div className="text-center py-16 text-slate-400">No messages yet.</div>
                ) : (
                  <ul className="divide-y divide-slate-50">
                    {contacts.map((c, i) => (
                      <li
                        key={c.id}
                        data-testid={`admin-contact-row-${i}`}
                        className={`flex items-start gap-4 p-4 hover:bg-slate-50 transition-colors ${c.status === "unread" ? "bg-amber-50/30" : ""}`}
                      >
                        <div className="grid place-items-center w-10 h-10 rounded-xl bg-[#0E1E38] text-amber-400 font-bold shrink-0">
                          {c.name?.[0] ?? "?"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-[#0E1E38]">{c.name}</span>
                            {c.status === "unread" && (
                              <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">New</span>
                            )}
                            <span className="text-xs text-slate-400">{c.role && `· ${c.role}`}</span>
                          </div>
                          <p className="text-xs text-amber-600 font-medium">{c.subject}</p>
                          <p className="text-sm text-slate-600 mt-0.5 line-clamp-2">{c.message}</p>
                          <p className="text-xs text-slate-400 mt-1">{c.email} {c.phone && `· ${c.phone}`}</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button
                            data-testid={`admin-view-contact-${i}`}
                            onClick={() => { setViewContact(c); markContactRead(c.id); }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-[#0E1E38] hover:bg-slate-100 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            data-testid={`admin-delete-contact-${i}`}
                            onClick={() => deleteContact(c.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* ── News tab ── */}
            {tab === "news" && (
              <div className="grid lg:grid-cols-5 gap-6">
                {/* Form */}
                <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="font-display text-lg font-semibold text-[#0E1E38] mb-4">
                    {editingNews ? "Edit news item" : "Add new item"}
                  </h3>
                  <form onSubmit={submitNews} data-testid="admin-news-form" className="space-y-4">
                    <div>
                      <Label htmlFor="news-title">Title *</Label>
                      <Input
                        id="news-title"
                        data-testid="admin-news-title-input"
                        value={newsForm.title}
                        onChange={(e) => setNewsForm((f) => ({ ...f, title: e.target.value }))}
                        placeholder="News headline"
                        className="mt-1.5"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="news-tag">Tag</Label>
                        <Input
                          id="news-tag"
                          data-testid="admin-news-tag-input"
                          value={newsForm.tag}
                          onChange={(e) => setNewsForm((f) => ({ ...f, tag: e.target.value }))}
                          placeholder="Achievement, Sports…"
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="news-date">Date</Label>
                        <Input
                          id="news-date"
                          type="date"
                          data-testid="admin-news-date-input"
                          value={newsForm.date}
                          onChange={(e) => setNewsForm((f) => ({ ...f, date: e.target.value }))}
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="news-body">Body *</Label>
                      <Textarea
                        id="news-body"
                        data-testid="admin-news-body-input"
                        value={newsForm.body}
                        onChange={(e) => setNewsForm((f) => ({ ...f, body: e.target.value }))}
                        placeholder="Full news content..."
                        rows={5}
                        className="mt-1.5"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={newsLoading}
                        data-testid="admin-news-submit-button"
                        className="inline-flex items-center gap-2 rounded-full bg-[#0E1E38] text-white font-semibold px-5 py-2.5 text-sm transition-colors hover:bg-[#162B4D] disabled:opacity-60"
                      >
                        {newsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {editingNews ? "Update" : "Publish"}
                      </button>
                      {editingNews && (
                        <button
                          type="button"
                          data-testid="admin-news-cancel-edit"
                          onClick={() => { setEditingNews(null); setNewsForm({ title: "", tag: "General", date: "", body: "" }); }}
                          className="inline-flex items-center gap-2 rounded-full border border-slate-200 text-slate-600 font-semibold px-5 py-2.5 text-sm hover:bg-slate-50 transition-colors"
                        >
                          <X className="w-4 h-4" /> Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* News list */}
                <div className="lg:col-span-3 space-y-4">
                  {news.length === 0 ? (
                    <div className="text-center py-16 text-slate-400 rounded-2xl border border-slate-200 bg-white">
                      No news items yet. Add the first one.
                    </div>
                  ) : (
                    news.map((n, i) => (
                      <div
                        key={n.id}
                        data-testid={`admin-news-item-${i}`}
                        className="rounded-2xl border border-slate-200 bg-white p-5 flex gap-4"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{n.tag}</span>
                            {n.date && <span className="text-xs text-slate-400">{n.date}</span>}
                          </div>
                          <h4 className="font-display font-semibold text-[#0E1E38] mt-1">{n.title}</h4>
                          <p className="text-sm text-slate-500 mt-1 line-clamp-2">{n.body}</p>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0">
                          <button
                            data-testid={`admin-edit-news-${i}`}
                            onClick={() => startEditNews(n)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-[#0E1E38] hover:bg-slate-100 transition-colors"
                            title="Edit"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            data-testid={`admin-delete-news-${i}`}
                            onClick={() => deleteNews(n.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Admission detail modal */}
      <Dialog open={!!viewAdm} onOpenChange={(o) => !o && setViewAdm(null)}>
        <DialogContent className="max-w-lg" data-testid="admin-adm-detail-modal">
          {viewAdm && (
            <div>
              <DialogHeader>
                <DialogTitle>Admission Enquiry — {viewAdm.student_name}</DialogTitle>
              </DialogHeader>
              <div className="p-6 pt-4 space-y-3 text-sm">
                {[
                  ["Student", viewAdm.student_name],
                  ["Parent / Guardian", viewAdm.parent_name],
                  ["Email", viewAdm.email],
                  ["Phone", viewAdm.phone],
                  ["Grade", viewAdm.grade],
                  ["Date of Birth", viewAdm.dob || "—"],
                  ["Current School", viewAdm.current_school || "—"],
                  ["Submitted on", new Date(viewAdm.created_at).toLocaleString("en-IN")],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-2">
                    <span className="text-slate-400 w-40 shrink-0">{k}</span>
                    <span className="text-[#0E1E38] font-medium">{v}</span>
                  </div>
                ))}
                {viewAdm.message && (
                  <div>
                    <span className="text-slate-400 block mb-1">Message</span>
                    <p className="text-slate-600 bg-slate-50 rounded-lg p-3">{viewAdm.message}</p>
                  </div>
                )}
                <div className="pt-2">
                  <span className="text-slate-400 block mb-2">Update status</span>
                  <div className="flex flex-wrap gap-2">
                    {STATUS_OPTIONS.map((s) => (
                      <button
                        key={s}
                        data-testid={`admin-adm-status-${s}`}
                        onClick={() => updateAdmStatus(viewAdm.id, s)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${viewAdm.status === s ? "bg-[#0E1E38] text-white border-transparent" : "border-slate-200 text-slate-600 hover:border-amber-300"}`}
                      >
                        {STATUS_MAP[s].label}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  data-testid="admin-delete-enquiry-button"
                  onClick={() => deleteAdm(viewAdm.id)}
                  className="inline-flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium pt-2 transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Delete enquiry
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact detail modal */}
      <Dialog open={!!viewContact} onOpenChange={(o) => !o && setViewContact(null)}>
        <DialogContent className="max-w-lg" data-testid="admin-contact-detail-modal">
          {viewContact && (
            <div>
              <DialogHeader>
                <DialogTitle>Message from {viewContact.name}</DialogTitle>
              </DialogHeader>
              <div className="p-6 pt-4 space-y-3 text-sm">
                {[
                  ["From", viewContact.name],
                  ["Email", viewContact.email],
                  ["Phone", viewContact.phone || "—"],
                  ["Role", viewContact.role || "—"],
                  ["Subject", viewContact.subject],
                  ["Date", new Date(viewContact.created_at).toLocaleString("en-IN")],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-2">
                    <span className="text-slate-400 w-28 shrink-0">{k}</span>
                    <span className="text-[#0E1E38] font-medium">{v}</span>
                  </div>
                ))}
                <div>
                  <span className="text-slate-400 block mb-1">Message</span>
                  <p className="text-slate-600 bg-slate-50 rounded-lg p-3">{viewContact.message}</p>
                </div>
                <button
                  data-testid="admin-delete-contact-modal-button"
                  onClick={() => deleteContact(viewContact.id)}
                  className="inline-flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium pt-2 transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Delete message
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
