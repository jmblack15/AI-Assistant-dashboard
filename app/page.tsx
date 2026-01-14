"use client";

import { AssistantList } from '@/src/components/AssistantList.tsx';
import { useAssistantStore } from '@/src/store/useAssistantStore';
import { Plus } from 'lucide-react';

export default function Home() {

  const openModal = useAssistantStore((state) => state.openModal);
  return (
    <main className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Asistentes IA Funnelhot</h1>
          <p className="text-slate-500 mt-1">Gestiona y entrena tus modelos de automatización.</p>
        </div>

        <button
          onClick={() => { }}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all active:scale-95 shadow-md"
        >
          <Plus size={20} />
          Crear Asistente
        </button>
      </header>

      <AssistantList />
    </main>
  );
}
