'use client';

import { Search } from 'lucide-react';
import { InputField } from "@/components/UI/Typography";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className="relative flex-1 group w-full">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
        size={20}
      />

      <InputField
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar Asistente..."
        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 outline-none ring-offset-background transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm"
      />

      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[10px] text-slate-400 font-medium uppercase pointer-events-none">
        <span>⌘</span>
        <span>K</span>
      </div>
    </div>
  );
};