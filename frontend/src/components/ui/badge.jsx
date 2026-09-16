import { cn } from "@/lib/utils";

const variants = {
  default: "bg-[#0E1E38] text-white",
  amber: "bg-amber-100 text-amber-800",
  green: "bg-emerald-100 text-emerald-800",
  red: "bg-red-100 text-red-700",
  slate: "bg-slate-100 text-slate-700",
};

export const Badge = ({ className, variant = "default", ...props }) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
      variants[variant] ?? variants.default,
      className
    )}
    {...props}
  />
);
