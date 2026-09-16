import { PageHeader, Section } from "@/components/Section";
import { IMAGES, TIMELINE, VALUES, LEADERSHIP, SCHOOL } from "@/data/siteData";
import { ShieldCheck, Lightbulb, Flag, HeartHandshake, Target, Eye } from "lucide-react";

const iconMap = { "shield-check": ShieldCheck, lightbulb: Lightbulb, flag: Flag, "heart-handshake": HeartHandshake };

export default function About() {
  return (
    <div data-testid="about-page">
      <PageHeader eyebrow="About Us" title="A legacy of learning since 1991" subtitle="Three decades of shaping confident, compassionate and capable citizens." image={IMAGES.facade} />

      <Section eyebrow="Our Story" title="Built on a vision of holistic education">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>{SCHOOL.name} was founded in {SCHOOL.estd} with a simple yet powerful belief: that every child deserves an education that develops the head, the heart and the hand.</p>
            <p>From a modest beginning with 120 students, we have grown into one of the region's most respected CBSE institutions, home to over 2,500 learners and a dedicated faculty of experienced educators.</p>
            <p>Our 12-acre campus is a vibrant ecosystem of classrooms, laboratories, studios, playing fields and libraries — designed to make learning an adventure.</p>
          </div>
          <img src={IMAGES.campusBuilding} alt="Campus" className="rounded-3xl w-full object-cover aspect-[4/3] shadow-xl" />
        </div>
      </Section>

      <section className="bg-[#FDFBF7] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid md:grid-cols-2 gap-6">
          <div data-testid="vision-card" className="rounded-2xl bg-white border border-slate-200 p-8">
            <div className="grid place-items-center w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 mb-4"><Eye className="w-6 h-6" /></div>
            <h3 className="font-display text-2xl font-semibold text-[#0E1E38] mb-3">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed">To be a centre of educational excellence that empowers young people to become lifelong learners, ethical leaders and responsible global citizens.</p>
          </div>
          <div data-testid="mission-card" className="rounded-2xl bg-white border border-slate-200 p-8">
            <div className="grid place-items-center w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 mb-4"><Target className="w-6 h-6" /></div>
            <h3 className="font-display text-2xl font-semibold text-[#0E1E38] mb-3">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed">To provide a nurturing, inclusive and stimulating environment where academic rigour meets creativity, character and compassion.</p>
          </div>
        </div>
      </section>

      <Section eyebrow="Our Journey" title="Milestones through the years">
        <div className="relative border-l-2 border-amber-200 ml-3 space-y-10">
          {TIMELINE.map((t, i) => (
            <div key={i} data-testid={`timeline-item-${i}`} className="relative pl-8">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-amber-500 ring-4 ring-amber-100" />
              <div className="font-mono-accent text-amber-600 font-semibold">{t.year}</div>
              <p className="text-slate-600 mt-1 max-w-2xl">{t.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-[#0E1E38]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white text-center mb-12">Values that guide us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => {
              const Icon = iconMap[v.icon];
              return (
                <div key={i} data-testid={`about-value-${i}`} className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center">
                  <div className="grid place-items-center w-14 h-14 rounded-2xl bg-amber-500 text-[#0E1E38] mx-auto mb-4"><Icon className="w-6 h-6" /></div>
                  <h3 className="font-display text-lg font-semibold text-white">{v.title}</h3>
                  <p className="text-sm text-slate-400 mt-2">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Section eyebrow="Leadership" title="Meet our Principal" center>
        <div className="max-w-md mx-auto text-center">
          <img src={LEADERSHIP[0].image} alt={LEADERSHIP[0].name} className="rounded-3xl w-full object-cover aspect-[4/5] shadow-xl mb-6" />
          <h3 className="font-display text-2xl font-semibold text-[#0E1E38]">{LEADERSHIP[0].name}</h3>
          <p className="text-amber-600 text-sm uppercase tracking-widest">{LEADERSHIP[0].role}</p>
          <p className="text-slate-600 mt-4 italic">“{LEADERSHIP[0].quote}”</p>
        </div>
      </Section>
    </div>
  );
}
