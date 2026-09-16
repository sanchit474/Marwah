export const Section = ({ eyebrow, title, subtitle, center, children, className = "" }) => (
  <section className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
    <div className="max-w-7xl mx-auto">
      {(eyebrow || title) && (
        <div className={`mb-12 ${center ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}`}>
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-600 mb-3">{eyebrow}</p>
          )}
          {title && (
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0E1E38] leading-tight">{title}</h2>
          )}
          {subtitle && <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  </section>
);

export const PageHeader = ({ eyebrow, title, subtitle, image }) => (
  <section className="relative bg-[#0E1E38] overflow-hidden">
    {image && (
      <div className="absolute inset-0">
        <img src={image} alt="" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E1E38] via-[#0E1E38]/85 to-[#0E1E38]/60" />
      </div>
    )}
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      {eyebrow && <p className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-400 mb-4">{eyebrow}</p>}
      <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] max-w-3xl">{title}</h1>
      {subtitle && <p className="text-lg text-slate-300 mt-5 max-w-2xl leading-relaxed">{subtitle}</p>}
    </div>
  </section>
);
