import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { GraduationCap, Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SCHOOL } from "@/data/siteData";
import { toast } from "sonner";

export default function AdminLogin() {
  const { user, checking, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!checking && user) navigate("/admin");
  }, [checking, user, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.ok) {
      toast.success("Welcome back!");
      navigate("/admin");
    } else {
      toast.error(result.error || "Login failed. Please check your credentials.");
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <Loader2 className="w-8 h-8 animate-spin text-[#0E1E38]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0E1E38] via-[#162B4D] to-[#0E1E38] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="grid place-items-center w-14 h-14 rounded-2xl bg-amber-500 text-[#0E1E38]">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div className="text-left">
              <div className="font-display font-bold text-white text-xl">{SCHOOL.short}</div>
              <div className="text-xs uppercase tracking-[0.2em] text-amber-400 font-medium">Admin Portal</div>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h1 className="font-display text-2xl font-bold text-[#0E1E38] mb-1">Sign in</h1>
          <p className="text-sm text-slate-500 mb-7">Access the school administration dashboard.</p>

          <form onSubmit={submit} data-testid="admin-login-form" className="space-y-5">
            <div>
              <Label htmlFor="admin-email">Email address</Label>
              <Input
                id="admin-email"
                type="email"
                data-testid="admin-email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="mt-1.5"
                autoComplete="email"
              />
            </div>

            <div>
              <Label htmlFor="admin-password">Password</Label>
              <div className="relative mt-1.5">
                <Input
                  id="admin-password"
                  type={showPw ? "text" : "password"}
                  data-testid="admin-password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="pr-11"
                />
                <button
                  type="button"
                  data-testid="toggle-password-visibility"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              data-testid="admin-login-button"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#0E1E38] hover:bg-[#162B4D] text-white font-semibold py-3.5 transition-colors disabled:opacity-60"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>
              ) : (
                <><LogIn className="w-4 h-4" /> Sign in</>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          <Link to="/" className="hover:text-amber-400 transition-colors">← Back to school website</Link>
        </p>
      </div>
    </div>
  );
}
