interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: { value: string; label: string }[];
    error?: string;
}

export const Select = ({ label, options, error, ...props }: SelectProps) => (
    <div className="space-y-1.5 w-full">
        <label className="text-sm font-semibold text-slate-700">{label}</label>
        <select
            className="w-full px-3 py-2 bg-white border mt-2 text-slate-900 border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%7BstrokeColor}%7BstrokeWidth}%7BstrokeLinecap}%7BstrokeLinejoin}%3E')] bg-[length:16px] bg-[right_16px_center] bg-no-repeat"
            {...props}
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
        {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
);