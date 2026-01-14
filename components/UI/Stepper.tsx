import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const Stepper = ({ currentStep }: { currentStep: number }) => (
    <div className="flex items-center justify-center gap-4 mb-8">
        {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
                <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors",
                    currentStep === s ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
                )}>
                    {s}
                </div>
                <span className={cn(
                    "text-sm font-medium",
                    currentStep === s ? "text-slate-900" : "text-slate-400"
                )}>
                    {s === 1 ? 'Datos Básicos' : 'Configuración'}
                </span>
                {s === 1 && <div className="w-12 h-px bg-slate-200 ml-2" />}
            </div>
        ))}
    </div>
);