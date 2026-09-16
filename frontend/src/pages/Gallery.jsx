import { useState } from "react";
import { PageHeader, Section } from "@/components/Section";
import { GALLERY, GALLERY_CATS, IMAGES } from "@/data/siteData";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function Gallery() {
  const [cat, setCat] = useState("All");
  const [active, setActive] = useState(null);
  const list = cat === "All" ? GALLERY : GALLERY.filter((g) => g.cat === cat);

  return (
    <div data-testid="gallery-page">
      <PageHeader eyebrow="Gallery" title="Moments that define us" subtitle="A glimpse into life, learning and celebration at Marwah Modern." image={IMAGES.campusBuilding} />

      <Section>
        <div className="flex flex-wrap gap-2 mb-10">
          {GALLERY_CATS.map((c) => (
            <button
              key={c}
              data-testid={`gallery-filter-${c.toLowerCase()}`}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${cat === c ? "bg-amber-500 text-[#0E1E38]" : "bg-white border border-slate-200 text-slate-600 hover:border-amber-300"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {list.map((g, i) => (
            <button
              key={i}
              data-testid={`gallery-item-${i}`}
              onClick={() => setActive(g)}
              className="mb-6 block w-full break-inside-avoid group relative rounded-2xl overflow-hidden"
            >
              <img src={g.src} alt={g.caption} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1E38]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-sm font-medium">{g.caption}</span>
              </div>
            </button>
          ))}
        </div>
      </Section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden border-0" data-testid="gallery-lightbox">
          {active && (
            <div className="relative">
              <img src={active.src} alt={active.caption} className="w-full max-h-[75vh] object-contain bg-black" />
              <div className="bg-[#0E1E38] text-white px-5 py-3 text-sm">{active.caption}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
