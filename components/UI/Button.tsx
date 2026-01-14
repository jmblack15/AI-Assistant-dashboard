import { LucideIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utilidad para mezclar clases de Tailwind de forma segura
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    icon?: LucideIcon;
    isLoading?: boolean;
}

export const Button = ({
    children,
    variant = 'primary',
    icon: Icon,
    isLoading,
    className,
    ...props
}: ButtonProps) => {
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-200',
        secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
        danger: 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-100',
        ghost: 'bg-transparent text-slate-500 hover:bg-slate-100',
    };

    return (
        <button
            className={cn(
                'flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
                variants[variant],
                className
            )}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="h-5 w-5 border-2 border-current border-t-transparent animate-spin rounded-full" />
            ) : (
                Icon && <Icon size={18} />
            )}
            {children}
        </button>
    );
};