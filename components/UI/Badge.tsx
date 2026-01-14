export const Badge = ({ children, variant = 'slate' }: { children: React.ReactNode, variant?: 'blue' | 'slate' | 'green' }) => {
    const styles = {
        blue: 'bg-blue-50 text-blue-700 border-blue-100',
        slate: 'bg-slate-100 text-slate-700 border-slate-200',
        green: 'bg-green-50 text-green-700 border-green-100',
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[variant]}`}>
            {children}
        </span>
    );
};