import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Heading = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h1 className={cn("text-3xl font-extrabold text-slate-900 tracking-tight dark:text-white", className)}>
    {children}
  </h1>
);

export const Subheading = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h2 className={cn("text-lg font-medium text-slate-500 mt-1", className)}>
    {children}
  </h2>
);


export const Paragraph = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <p className={cn("text-slate-500 dark:text-slate-400 mb-6", className)}>
    {children}
  </p>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const InputField = ({ label, error, className, ...props }: InputProps) => (
  <div className="space-y-4 w-full ">
    {label && <label className="text-sm font-semibold text-slate-700 mb-10">{label}</label>}
    <input
      className={cn(
        "w-full px-3 py-2 mt-2 bg-white border rounded-lg outline-none text-slate-900 transition-all focus:ring-2 focus:ring-blue-500/20",
        error ? "border-red-500" : "border-slate-200 focus:border-blue-500",
        className
      )}
      {...props}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);