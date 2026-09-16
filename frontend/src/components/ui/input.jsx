import { cn } from "@/lib/utils";

export const Input = ({ className, type = "text", ...props }) => (
  <input
    type={type}
    className={cn(
      "flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0E1E38] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition",
      className
    )}
    {...props}
  />
);
