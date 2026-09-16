import { useState } from "react";
import { PageHeader, Section } from "@/components/Section";
import { IMAGES, STREAMS } from "@/data/siteData";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckCircle2, BookOpen, FlaskConical, Palette, Dumbbell } from "lucide-react";

const cocurricular = [
  { icon: FlaskConical, title: "STEM & Robotics", desc: "Innovation labs, coding club and annual science fair." },
  { icon: Palette, title: "Arts & Culture", desc: "Music, dance, theatre and visual arts studios." },
  { icon: Dumbbell, title: "Sports Academy", desc: "Athletics, swimming, basketball, cricket and yoga." },
  { icon: BookOpen, title: "Literary Society", desc: "Debate, MUN, creative writing and public speaking." },
];

const assessment = [
  "Continuous & Comprehensive Evaluation (CCE) across the year",
  "Periodic unit tests and term examinations",
  "Project-based and experiential assessments",
  "Personalised progress reports and parent feedback",
];

export default function Academics() {
  const [tab, setTab] = useState("primary");
  return (
    <div data-testid="academics-page">
      <PageHeader eyebrow="Academics" title="A curriculum that inspires and challenges" subtitle="A holistic CBSE framework balancing academic depth with real-world skills." image={IMAGES.classroom} />

      <Section eyebrow="Curriculum Framework" title="Learning that goes beyond the textbook">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <img src={IMAGES.scienceLab} alt="Curriculum" className="rounded-3xl w-full object-cover aspect-[4/3] shadow-xl order-2 lg:order-1" />
          <div className="order-1 lg:order-2 space-y-4 text-slate-600 leading-relaxed">
            <p>Our curriculum follows the CBSE framework, enriched with inquiry-based pedagogy, integrated technology and a strong emphasis on conceptual understanding.</p>
            <p>We move beyond rote learning to build critical thinking, collaboration, communication and creativity — the skills that matter most in the 21st century.</p>
            <ul className="space-y-2 pt-2">
              {["Concept-first teaching", "Integrated digital learning", "Personalised academic mentoring", "Values & life-skills education"].map((f, i) => (
                <li key={i} className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-amber-500" /> {f}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <section className="bg-[#FDFBF7] border-y border-slate-200">
        <Section eyebrow="Academic Streams" title="Learning at every stage">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="flex flex-wrap h-auto bg-white border border-slate-200 p-1.5 rounded-xl gap-1">
              {STREAMS.map((s, i) => (
                <TabsTrigger key={i} value={["primary", "middle", "secondary", "senior"][i]} data-testid={`stream-tab-${i}`} className="data-[state=active]:bg-[#0E1E38] data-[state=active]:text-white rounded-lg px-4 py-2 text-sm font-medium">
                  {s.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {STREAMS.map((s, i) => (
              <TabsContent key={i} value={["primary", "middle", "secondary", "senior"][i]} className="mt-6">
                <div data-testid={`stream-panel-${i}`} className="rounded-2xl bg-white border border-slate-200 p-8">
                  <p className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-600 mb-2">{s.grades}</p>
                  <h3 className="font-display text-2xl font-semibold text-[#0E1E38] mb-3">{s.title}</h3>
                  <p className="text-slate-600 leading-relaxed max-w-2xl">{s.desc}</p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Section>
      </section>

      <Section eyebrow="Beyond the Classroom" title="Co-curricular excellence">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cocurricular.map((c, i) => (
            <div key={i} data-testid={`cocurricular-${i}`} className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow">
              <div className="grid place-items-center w-12 h-12 rounded-xl bg-amber-50 text-amber-600 mb-4"><c.icon className="w-6 h-6" /></div>
              <h3 className="font-display text-lg font-semibold text-[#0E1E38]">{c.title}</h3>
              <p className="text-sm text-slate-600 mt-2">{c.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-[#0E1E38]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-400 mb-3">Evaluation & Assessment</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">Fair, transparent, growth-focused</h2>
            <ul className="space-y-3">
              {assessment.map((a, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" /> {a}</li>
              ))}
            </ul>
          </div>
          <img src={IMAGES.library} alt="Assessment" className="rounded-3xl w-full object-cover aspect-[4/3] shadow-2xl" />
        </div>
      </section>
    </div>
  );
}
