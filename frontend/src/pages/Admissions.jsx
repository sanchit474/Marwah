import { useState } from "react";
import { toast } from "sonner";
import { PageHeader, Section } from "@/components/Section";
import { IMAGES, ADMISSION_STEPS, FEES, GRADES, SCHOOL } from "@/data/siteData";
import api, { formatApiError } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

const empty = { student_name: "", parent_name: "", email: "", phone: "", grade: "", dob: "", current_school: "", message: "" };

export default function Admissions() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.student_name || !form.parent_name || !form.email || !form.phone || !form.grade) {
      toast.error("Please fill all required fields.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/admissions", form);
      toast.success("Enquiry submitted! Our admissions team will contact you soon.");
      setForm(empty);
      setDone(true);
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="admissions-page">
      <PageHeader eyebrow="Admissions 2026-27" title="Begin your child's Marwah Modern journey" subtitle="A simple, transparent admission process. Enquire online in minutes." image={IMAGES.library} />

      <Section eyebrow="How It Works" title="Admission process in five steps">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {ADMISSION_STEPS.map((s, i) => (
            <div key={i} data-testid={`admission-step-${i}`} className="relative rounded-2xl border border-slate-200 bg-white p-6">
              <div className="font-display text-4xl font-bold text-amber-200">{i + 1}</div>
              <h3 className="font-display text-lg font-semibold text-[#0E1E38] mt-2">{s.title}</h3>
              <p className="text-sm text-slate-600 mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-[#FDFBF7] border-y border-slate-200">
        <Section eyebrow="Transparency" title="Fee structure 2026-27">
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#0E1E38] hover:bg-[#0E1E38]">
                  <TableHead className="text-white">Grade</TableHead>
                  <TableHead className="text-white">One-time Admission</TableHead>
                  <TableHead className="text-white">Tuition</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {FEES.map((f, i) => (
                  <TableRow key={i} data-testid={`fee-row-${i}`}>
                    <TableCell className="font-medium text-[#0E1E38]">{f.grade}</TableCell>
                    <TableCell>{f.admission}</TableCell>
                    <TableCell>{f.tuition}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-slate-500 mt-3">* Fees are indicative. Transport and one-time caution deposit are additional. Contact the office for exact details.</p>
        </Section>
      </section>

      <Section eyebrow="Enquire Online" title="Admission enquiry form">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            {done ? (
              <div data-testid="admission-success" className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                <h3 className="font-display text-2xl font-semibold text-[#0E1E38]">Thank you!</h3>
                <p className="text-slate-600 mt-2">Your enquiry has been received. Our admissions team will reach out shortly.</p>
                <button data-testid="admission-new-button" onClick={() => setDone(false)} className="mt-6 rounded-full bg-[#0E1E38] text-white font-semibold px-6 py-3">Submit another enquiry</button>
              </div>
            ) : (
              <form onSubmit={submit} data-testid="admission-enquiry-form" className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="student_name">Student Name *</Label>
                  <Input id="student_name" data-testid="student-name-input" value={form.student_name} onChange={(e) => update("student_name", e.target.value)} placeholder="Full name" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="parent_name">Parent / Guardian Name *</Label>
                  <Input id="parent_name" data-testid="parent-name-input" value={form.parent_name} onChange={(e) => update("parent_name", e.target.value)} placeholder="Full name" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" data-testid="parent-email-input" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" data-testid="parent-phone-input" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 ..." className="mt-1.5" />
                </div>
                <div>
                  <Label>Grade Applying For *</Label>
                  <Select value={form.grade} onValueChange={(v) => update("grade", v)}>
                    <SelectTrigger data-testid="grade-select" className="mt-1.5"><SelectValue placeholder="Select grade" /></SelectTrigger>
                    <SelectContent>
                      {GRADES.map((g) => <SelectItem key={g} value={g} data-testid={`grade-option-${g}`}>{g}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" data-testid="dob-input" value={form.dob} onChange={(e) => update("dob", e.target.value)} className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="current_school">Current School (if any)</Label>
                  <Input id="current_school" data-testid="current-school-input" value={form.current_school} onChange={(e) => update("current_school", e.target.value)} placeholder="Previous / current school" className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" data-testid="message-input" value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Any questions or notes..." className="mt-1.5" rows={4} />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" disabled={loading} data-testid="enquiry-submit-button" className="inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-400 text-[#0E1E38] font-semibold px-7 py-3.5 transition-colors disabled:opacity-60">
                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : <><Send className="w-4 h-4" /> Submit Enquiry</>}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="rounded-2xl bg-[#0E1E38] text-white p-6 sm:p-8 h-fit">
            <h3 className="font-display text-xl font-semibold mb-4">Admissions Desk</h3>
            <p className="text-slate-300 text-sm leading-relaxed">Have questions? Our team is here to help you every step of the way.</p>
            <div className="mt-6 space-y-3 text-sm">
              <p className="text-slate-400">Call us</p>
              <a href={`tel:${SCHOOL.admissionsPhone}`} className="text-amber-400 font-semibold text-lg block">{SCHOOL.admissionsPhone}</a>
              <p className="text-slate-400 pt-2">Email</p>
              <a href={`mailto:${SCHOOL.email}`} className="text-amber-400 block">{SCHOOL.email}</a>
              <p className="text-slate-400 pt-2">Office hours</p>
              <p>{SCHOOL.hours}</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
