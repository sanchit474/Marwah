import { cn } from "@/lib/utils";

export const Textarea = ({ className, ...props }) => (
  <textarea
    className={cn(
      "flex min-h-[80px] w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0E1E38] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition resize-y",
      className
    )}
    {...props}
  />
);
