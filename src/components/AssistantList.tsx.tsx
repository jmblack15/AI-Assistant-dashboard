import { useAssistants } from '../hooks/useAssistants';
import { AssistantCard } from './AssistantCard';
import { Car, Loader2, PlusCircle } from 'lucide-react';
import { useAssistantStore } from '../store/useAssistantStore';
import { CardSkeleton } from './UI/CardSkeleton';

const AssistantList = () => {
  const { assistantsQuery } = useAssistants();
  const openModal = useAssistantStore((state) => state.openModal);

  if (assistantsQuery.isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((skeleton) => (<CardSkeleton key={skeleton} />))}
      </div>
    );
  }

  if (!assistantsQuery.data || assistantsQuery.data.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
        <h3 className="text-xl font-semibold text-slate-700 mb-2">No hay asistentes aún</h3>
        <p className="text-slate-500 mb-6">Comienza creando tu primer asistente de IA para automatizar tus ventas.</p>
        <button
          onClick={() => openModal('create')}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
        >
          <PlusCircle size={20} />
          Crear Primer Asistente
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {assistantsQuery.data.map((assistant) => (
        <AssistantCard key={assistant.id} assistant={assistant} />
      ))}
    </div>
  );
};

export { AssistantList };