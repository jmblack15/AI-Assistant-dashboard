import { Assistant } from '../types/assistant';
import { useAssistantStore } from '../store/useAssistantStore';
import { useAssistants } from '../hooks/useAssistants';
import { Edit2, Trash2, MessageSquare, Languages, Smile } from 'lucide-react';
import Link from 'next/link';

interface Props {
  assistant: Assistant;
}

const AssistantCard = ({ assistant }: Props) => {
  const openModal = useAssistantStore((state) => state.openModal);
  const { deleteMutation } = useAssistants();

  const handleDelete = () => {
    if (confirm('¿Estás seguro de que deseas eliminar este asistente?')) { // Requisito: Confirmación [cite: 79]
      deleteMutation.mutate(assistant.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-slate-800">{assistant.name}</h3>
        <div className="flex gap-2">
          {/* Botones de acción [cite: 25] */}
          <button 
            onClick={() => openModal('edit', assistant)}
            className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
            title="Editar"
          >
            <Edit2 size={18} />
          </button>
          <button 
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="p-2 text-slate-400 hover:text-red-600 transition-colors disabled:opacity-50"
            title="Eliminar"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center text-sm text-slate-600 gap-2">
          <Languages size={16} />
          <span>{assistant.language}</span>
        </div>
        <div className="flex items-center text-sm text-slate-600 gap-2">
          <Smile size={16} />
          <span>{assistant.tone}</span>
        </div>
      </div>

      <Link 
        href={`/assistant/${assistant.id}`} // Ruta de entrenamiento [cite: 64]
        className="flex items-center justify-center gap-2 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-lg transition-colors border border-slate-200"
      >
        <MessageSquare size={18} />
        Entrenar y Probar
      </Link>
    </div>
  );
};

export { AssistantCard };