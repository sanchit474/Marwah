import { useState } from "react";
import { PageHeader, Section } from "@/components/Section";
import { IMAGES } from "@/data/siteData";
import { Search, Calendar, Tag, ChevronRight, Megaphone, FlaskConical, Trophy, Users, BookOpen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const EVENTS = [
  { date: "Oct 15, 2026", title: "Half-Yearly Examinations Begin", category: "Academics", icon: BookOpen, desc: "Half-yearly examinations for Grades 6–12 commence. Please refer to the individual timetables shared via student portal." },
  { date: "Oct 28, 2026", title: "Annual Science & Innovation Fair", category: "Science", icon: FlaskConical, desc: "Students from Grades 4–12 showcase original experiments and innovations. Open to parents. Registration for project entries closes Oct 20." },
  { date: "Nov 5, 2026", title: "Parent–Teacher Meet (Junior Wing)", category: "Community", icon: Users, desc: "P-T Meet for Grades 1–5. Parents are requested to arrive 10 minutes early and collect their appointment slots from the front office." },
  { date: "Nov 22, 2026", title: "Inter-House Sports Meet", category: "Sports", icon: Trophy, desc: "Annual sports day featuring athletics, field events, and team sports. Four houses compete for the Rolling Shield." },
  { date: "Dec 12, 2026", title: "Annual Cultural Fest — 'Tarang 2026'", category: "Cultural", icon: Megaphone, desc: "A full-day celebration of music, dance, drama and visual arts. All parents and alumni warmly invited. Passes available at the school office." },
];

const NEWS_ITEMS = [
  {
    id: 1,
    date: "Sep 10, 2026",
    tag: "Achievement",
    title: "Class XII students achieve 100% CBSE board pass rate",
    summary: "For the twelfth consecutive year, Marwah Modern's Class XII batch has achieved a 100% pass rate in CBSE board examinations. 28 students scored above 95%.",
    body: "We are thrilled to announce that the Class XII batch of 2025-26 has once again achieved a perfect 100% pass rate in CBSE board examinations — a streak spanning twelve unbroken years.\n\nAmong the highlights: 28 students scored 95% and above, with topper Ananya Sharma securing an outstanding 98.6%. Six students from the Science stream received admission offers from IITs and NITs, while multiple Commerce students have secured seats at top business schools.\n\nPrincipal Dr. Anjali Marwah addressed the school on the achievement: \u201cThese results reflect not just academic effort but the holistic development we strive for every day. Congratulations to every student, parent and teacher who made this possible.\u201d\n\nThe school will felicitate the top achievers at a special ceremony during Founder's Day in November.",
  },
  {
    id: 2,
    date: "Aug 28, 2026",
    tag: "Facility",
    title: "New Robotics & AI Lab inaugurated on campus",
    summary: "Our state-of-the-art Robotics & Artificial Intelligence Lab, equipped with 30 Arduino/Raspberry Pi workstations, was inaugurated by the School Management Committee.",
    body: "Marwah Modern is proud to inaugurate its new Robotics & Artificial Intelligence Laboratory, a significant investment in the school's STEM infrastructure.\n\nThe lab is equipped with 30 dedicated workstations — each featuring Arduino Uno, Raspberry Pi 4, servo motors, sensors and a 3D-printer bay. Students from Grade 6 onwards can now access hands-on AI/ML modules as part of their Computer Science curriculum.\n\nThe lab was inaugurated by SMC Chairman Mr. Deepak Marwah in a ceremony attended by faculty, students and parents. The first robotics club session is scheduled for October 1st, open to students Grades 7–12 by application.",
  },
  {
    id: 3,
    date: "Aug 5, 2026",
    tag: "Sports",
    title: "School football team wins State-Level U-17 Championship",
    summary: "Our U-17 football squad clinched the gold at the Delhi State Schools U-17 Championship, defeating St. Columba's 2-1 in the final.",
    body: "The Marwah Modern U-17 football team has brought home the gold at the Delhi State Schools U-17 Championship — the school's first football state title in six years.\n\nCoach Vikram Rao's squad defeated St. Columba's 2-1 in an exciting final at Jawaharlal Nehru Stadium. Goals were scored by captain Aarush Verma and striker Karan Mehta, with goalkeeper Pradeep Singh delivering an outstanding save in extra time.\n\nThe team will represent Delhi at the SGFI National Games in January 2027. Congratulations to all the players and coaching staff!",
  },
  {
    id: 4,
    date: "Jul 20, 2026",
    tag: "Admissions",
    title: "Admissions 2026-27 open — limited seats in senior grades",
    summary: "Applications for the academic year 2026-27 are now open. Seats are limited for Grades 9–12. Early enquiry is advised.",
    body: "Admissions for the academic year 2026-27 are now officially open. While seats are available across all grades, availability is limited — particularly for Grades 9, 11 (Science stream) and Grade 12 lateral entry.\n\nParents are encouraged to submit the online enquiry form on the Admissions page. The admission process includes document verification and a student-parent interaction session.\n\nFor assistance, contact our Admissions Desk at +91 98765 11223 or email info@marwahmodern.edu.in. Office hours: Monday to Saturday, 8:00 AM – 3:30 PM.",
  },
];

const tagColors = {
  Achievement: "bg-emerald-100 text-emerald-800",
  Facility: "bg-blue-100 text-blue-800",
  Sports: "bg-orange-100 text-orange-800",
  Admissions: "bg-amber-100 text-amber-800",
  Science: "bg-purple-100 text-purple-800",
  Cultural: "bg-pink-100 text-pink-800",
  Community: "bg-teal-100 text-teal-800",
  Academics: "bg-slate-100 text-slate-700",
};

export default function NewsEvents() {
  const [search, setSearch] = useState("");
  const [activeNews, setActiveNews] = useState(null);

  const filtered = NEWS_ITEMS.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div data-testid="news-events-page">
      <PageHeader
        eyebrow="News & Events"
        title="Stay in the loop"
        subtitle="Latest announcements, achievements and upcoming events from Marwah Modern."
        image={IMAGES.campusBuilding}
      />

      {/* Upcoming Events */}
      <Section eyebrow="What's Coming" title="Upcoming events & dates">
        <div className="space-y-4">
          {EVENTS.map((ev, i) => (
            <div
              key={i}
              data-testid={`event-item-${i}`}
              className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="grid place-items-center w-12 h-12 rounded-xl bg-amber-50 text-amber-600 shrink-0">
                  <ev.icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-semibold text-[#0E1E38] truncate">{ev.title}</h3>
                  <p className="text-sm text-slate-500 mt-0.5 line-clamp-1">{ev.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:ml-auto shrink-0">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColors[ev.category] ?? "bg-slate-100 text-slate-700"}`}>
                  {ev.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5" /> {ev.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* News */}
      <section className="bg-[#FDFBF7] border-y border-slate-200">
        <Section eyebrow="School News" title="Latest from Marwah Modern">
          {/* Search */}
          <div className="relative max-w-md mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              data-testid="news-search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search news..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0E1E38] transition"
            />
          </div>

          {filtered.length === 0 ? (
            <p className="text-slate-500 text-sm" data-testid="news-empty">No results found for "{search}"</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((n, i) => (
                <article
                  key={n.id}
                  data-testid={`news-card-${i}`}
                  className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col gap-3 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1 ${tagColors[n.tag] ?? "bg-slate-100 text-slate-700"}`}>
                      <Tag className="w-3 h-3" /> {n.tag}
                    </span>
                    <span className="text-xs text-slate-400">{n.date}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#0E1E38] leading-snug">{n.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{n.summary}</p>
                  <button
                    data-testid={`news-readmore-${i}`}
                    onClick={() => setActiveNews(n)}
                    className="inline-flex items-center gap-1.5 text-amber-600 text-sm font-semibold mt-auto pt-2 border-t border-slate-100 hover:gap-2.5 transition-all"
                  >
                    Read full story <ChevronRight className="w-4 h-4" />
                  </button>
                </article>
              ))}
            </div>
          )}
        </Section>
      </section>

      {/* News detail modal */}
      <Dialog open={!!activeNews} onOpenChange={(o) => !o && setActiveNews(null)}>
        <DialogContent className="max-w-2xl" data-testid="news-detail-modal">
          {activeNews && (
            <div>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColors[activeNews.tag] ?? "bg-slate-100 text-slate-700"}`}>
                    {activeNews.tag}
                  </span>
                  <span className="text-xs text-slate-400">{activeNews.date}</span>
                </div>
                <DialogTitle>{activeNews.title}</DialogTitle>
              </DialogHeader>
              <div className="p-6 pt-4">
                {activeNews.body.split("\n\n").map((para, i) => (
                  <p key={i} className="text-sm text-slate-600 leading-relaxed mb-4">{para}</p>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
