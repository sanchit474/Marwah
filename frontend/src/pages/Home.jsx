import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FlaskConical, Monitor, Library, Trophy, ArrowRight, Quote, Phone,
  ShieldCheck, Lightbulb, Flag, HeartHandshake, Star,
} from "lucide-react";
import { Section } from "@/components/Section";
import { SCHOOL, IMAGES, STATS, HIGHLIGHTS, VALUES, LEADERSHIP, TESTIMONIALS } from "@/data/siteData";

const iconMap = {
  "flask-conical": FlaskConical, monitor: Monitor, library: Library, trophy: Trophy,
  "shield-check": ShieldCheck, lightbulb: Lightbulb, flag: Flag, "heart-handshake": HeartHandshake,
};

export default function Home() {
  return (
    <div data-testid="home-page">
      {/* Hero */}
      <section className="relative bg-[#0E1E38] overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.heroCampus} alt="Campus" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E1E38] via-[#0E1E38]/80 to-[#0E1E38]/30" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-400 mb-5">Estd. {SCHOOL.estd} · {SCHOOL.affiliation}</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05]">
              Nurturing Minds, <span className="text-amber-400">Shaping Futures</span>, Empowering Leaders
            </h1>
            <p className="text-lg text-slate-300 mt-6 max-w-2xl leading-relaxed">
              At {SCHOOL.name}, we blend academic rigour with character, creativity and compassion — preparing every child to thrive in a changing world.
            </p>
            <div className="flex flex-wrap gap-4 mt-9">
              <Link to="/admissions" data-testid="hero-explore-admissions-button" className="inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-400 text-[#0E1E38] font-semibold px-7 py-3.5 transition-all hover:shadow-xl hover:shadow-amber-500/30">
                Explore Admissions <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/about" data-testid="hero-about-button" className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white hover:bg-white/10 font-semibold px-7 py-3.5 transition-colors">
                Discover Our Story
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="relative border-t border-white/10 bg-[#0B1830]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {STATS.map((s, i) => (
              <div key={i} data-testid={`hero-stat-${i}`} className="py-8 px-4 text-center">
                <div className="font-display text-3xl sm:text-4xl font-bold text-amber-400">{s.value}</div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights bento */}
      <Section eyebrow="Campus Life" title="A campus built for curiosity" subtitle="World-class facilities that make learning immersive, hands-on and joyful.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HIGHLIGHTS.map((h, i) => {
            const Icon = iconMap[h.icon];
            return (
              <motion.div
                key={i}
                data-testid={`highlight-card-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-40 overflow-hidden">
                  <img src={h.image} alt={h.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="grid place-items-center w-11 h-11 rounded-xl bg-amber-50 text-amber-600 mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#0E1E38]">{h.title}</h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{h.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Principal message */}
      <section className="bg-[#FDFBF7] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img src={LEADERSHIP[0].image} alt={LEADERSHIP[0].name} className="rounded-3xl w-full object-cover aspect-[4/5] max-w-md shadow-2xl" />
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-[#0E1E38] text-white rounded-2xl px-6 py-4 shadow-xl">
              <div className="font-display text-lg">{LEADERSHIP[0].name}</div>
              <div className="text-xs text-amber-400 uppercase tracking-widest">{LEADERSHIP[0].role}</div>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-600 mb-3">Principal's Message</p>
            <Quote className="w-10 h-10 text-amber-400 mb-4" />
            <blockquote className="font-display text-2xl sm:text-3xl text-[#0E1E38] leading-snug">
              “Education is not the filling of a pail, but the lighting of a fire.”
            </blockquote>
            <p className="text-base text-slate-600 mt-6 leading-relaxed">
              Every child who walks through our gates carries a spark of infinite potential. Our role is to fan that spark
              into a lifelong flame of learning. At Marwah Modern, we combine tradition with innovation — nurturing
              intellect, integrity and imagination in equal measure.
            </p>
            <Link to="/about" data-testid="principal-readmore-link" className="inline-flex items-center gap-2 text-amber-600 font-semibold mt-6 hover:gap-3 transition-all">
              Read more about us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <Section eyebrow="What We Stand For" title="Our core values" center>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v, i) => {
            const Icon = iconMap[v.icon];
            return (
              <div key={i} data-testid={`value-card-${i}`} className="text-center p-6 rounded-2xl border border-slate-200 bg-white hover:border-amber-300 transition-colors">
                <div className="grid place-items-center w-14 h-14 rounded-2xl bg-[#0E1E38] text-amber-400 mx-auto mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-[#0E1E38]">{v.title}</h3>
                <p className="text-sm text-slate-600 mt-2">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Testimonials */}
      <section className="bg-[#0E1E38]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-400 mb-3 text-center">Community Voices</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white text-center mb-12">Loved by parents & students</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} data-testid={`testimonial-card-${i}`} className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, s) => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-200 leading-relaxed">“{t.text}”</p>
                <div className="flex items-center gap-3 mt-6">
                  <div className="grid place-items-center w-11 h-11 rounded-full bg-amber-500 text-[#0E1E38] font-semibold">{t.avatar}</div>
                  <div>
                    <div className="text-white font-medium">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission CTA */}
      <section className="bg-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0E1E38]">Admissions open for 2026-27</h2>
            <p className="text-[#0E1E38]/80 mt-2">Give your child the Marwah Modern advantage. Limited seats available.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/admissions" data-testid="cta-enquire-button" className="inline-flex items-center gap-2 rounded-full bg-[#0E1E38] text-white font-semibold px-7 py-3.5 hover:bg-[#162B4D] transition-colors">
              Enquire Now <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={`tel:${SCHOOL.admissionsPhone}`} data-testid="cta-call-button" className="inline-flex items-center gap-2 rounded-full border-2 border-[#0E1E38] text-[#0E1E38] font-semibold px-7 py-3.5 hover:bg-[#0E1E38] hover:text-white transition-colors">
              <Phone className="w-4 h-4" /> {SCHOOL.admissionsPhone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
