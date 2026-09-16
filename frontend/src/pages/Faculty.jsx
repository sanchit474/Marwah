import { useState } from "react";
import { PageHeader, Section } from "@/components/Section";
import { FACULTY, FACULTY_DEPTS, IMAGES } from "@/data/siteData";
import { GraduationCap, Clock } from "lucide-react";

export default function Faculty() {
  const [dept, setDept] = useState("All");
  const list = dept === "All" ? FACULTY : FACULTY.filter((f) => f.dept === dept);

  return (
    <div data-testid="faculty-page">
      <PageHeader eyebrow="Our Faculty" title="Mentors who inspire greatness" subtitle="A team of passionate, qualified educators devoted to every learner's growth." image={IMAGES.teacherMicroscope} />

      <Section>
        <div className="flex flex-wrap gap-2 mb-10">
          {FACULTY_DEPTS.map((d) => (
            <button
              key={d}
              data-testid={`faculty-filter-${d.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setDept(d)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${dept === d ? "bg-[#0E1E38] text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-amber-300"}`}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((f, i) => (
            <div key={f.name} data-testid={`faculty-card-${i}`} className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="grid place-items-center w-16 h-16 rounded-2xl bg-[#0E1E38] text-amber-400 font-display text-2xl font-bold mb-4">
                {f.name.split(" ").filter(Boolean).slice(-2).map((n) => n[0]).join("")}
              </div>
              <h3 className="font-display text-lg font-semibold text-[#0E1E38]">{f.name}</h3>
              <p className="text-amber-600 text-sm font-medium">{f.subject}</p>
              <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5" /> {f.qualification}</span>
                <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {f.exp}</span>
              </div>
              <p className="text-sm text-slate-600 mt-4 italic border-t border-slate-100 pt-3">“{f.quote}”</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
