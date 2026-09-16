import { useState } from "react";
import { toast } from "sonner";
import { PageHeader, Section } from "@/components/Section";
import { SCHOOL, IMAGES } from "@/data/siteData";
import api, { formatApiError } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Bus, Send, Loader2, CheckCircle2 } from "lucide-react";

const empty = { name: "", email: "", phone: "", role: "", subject: "", message: "" };

const ROLES = ["Parent", "Student", "Prospective Parent", "Alumni", "Staff", "Media / Press", "Other"];
const SUBJECTS = ["Admission Enquiry", "Academic Query", "Fee Related", "Transport & Bus", "Events & Activities", "Complaint / Feedback", "Other"];

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill all required fields.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/contact", form);
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setForm(empty);
      setDone(true);
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="contact-page">
      <PageHeader
        eyebrow="Contact Us"
        title="We'd love to hear from you"
        subtitle="Reach out with enquiries, feedback or just a hello — we're always happy to help."
        image={IMAGES.facade}
      />

      <Section>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-[#0E1E38] mb-6">Send us a message</h2>
            {done ? (
              <div data-testid="contact-success" className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                <h3 className="font-display text-2xl font-semibold text-[#0E1E38]">Message received!</h3>
                <p className="text-slate-600 mt-2 max-w-sm mx-auto">
                  Thank you for reaching out. A member of our team will respond within one school day.
                </p>
                <button
                  data-testid="contact-new-button"
                  onClick={() => setDone(false)}
                  className="mt-6 rounded-full bg-[#0E1E38] text-white font-semibold px-6 py-3 hover:bg-[#162B4D] transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} data-testid="contact-form" className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="c-name">Full Name *</Label>
                  <Input
                    id="c-name"
                    data-testid="contact-name-input"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your name"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="c-email">Email Address *</Label>
                  <Input
                    id="c-email"
                    type="email"
                    data-testid="contact-email-input"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@example.com"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="c-phone">Phone</Label>
                  <Input
                    id="c-phone"
                    data-testid="contact-phone-input"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+91 ..."
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label>I am a</Label>
                  <Select value={form.role} onValueChange={(v) => update("role", v)}>
                    <SelectTrigger data-testid="contact-role-select" className="mt-1.5">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES.map((r) => (
                        <SelectItem key={r} value={r} data-testid={`role-option-${r}`}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <Label>Subject *</Label>
                  <Select value={form.subject} onValueChange={(v) => update("subject", v)}>
                    <SelectTrigger data-testid="contact-subject-select" className="mt-1.5">
                      <SelectValue placeholder="What is this about?" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUBJECTS.map((s) => (
                        <SelectItem key={s} value={s} data-testid={`subject-option-${s}`}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="c-message">Message *</Label>
                  <Textarea
                    id="c-message"
                    data-testid="contact-message-input"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Write your message here..."
                    rows={5}
                    className="mt-1.5"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    data-testid="contact-submit-button"
                    className="inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-400 text-[#0E1E38] font-semibold px-7 py-3.5 transition-colors disabled:opacity-60"
                  >
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="w-4 h-4" /> Send Message</>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Info sidebar */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-[#0E1E38] text-white p-6">
              <h3 className="font-display text-lg font-semibold mb-4">School Office</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300">{SCHOOL.address}</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                  <a href={`tel:${SCHOOL.phone}`} className="text-amber-400 font-semibold">{SCHOOL.phone}</a>
                </li>
                <li className="flex gap-3">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                  <a href={`mailto:${SCHOOL.email}`} className="text-amber-400 break-all">{SCHOOL.email}</a>
                </li>
                <li className="flex gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                  <span className="text-slate-300">{SCHOOL.hours}</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-display text-lg font-semibold text-[#0E1E38] mb-2">Admissions Desk</h3>
              <p className="text-sm text-slate-500 mb-3">For admission enquiries, contact us directly:</p>
              <a
                href={`tel:${SCHOOL.admissionsPhone}`}
                data-testid="contact-admissions-phone"
                className="text-amber-600 font-bold text-lg block"
              >
                {SCHOOL.admissionsPhone}
              </a>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-amber-50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Bus className="w-5 h-5 text-amber-600" />
                <h3 className="font-display text-lg font-semibold text-[#0E1E38]">Transport Helpdesk</h3>
              </div>
              <p className="text-sm text-slate-600">
                For school bus routes, timings and transport-related queries, contact the Transport Office:
              </p>
              <p className="text-amber-600 font-semibold mt-2 text-sm">transport@marwahmodern.edu.in</p>
              <p className="text-xs text-slate-500 mt-1">Mon – Sat · 7:30 AM – 4:00 PM</p>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-video bg-slate-100 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <p className="text-xs">Map — Powayan, Shahjahanpur, Uttar Pradesh</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
