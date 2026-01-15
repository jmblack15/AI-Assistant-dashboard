import { Assistant } from '../types/assistant';
import { useAssistantStore } from '../store/useAssistantStore';
import { useAssistants } from '../hooks/useAssistants';
import { Edit2, Trash2, MessageSquare, Languages, Smile } from 'lucide-react';
import Link from 'next/link';


import { Button } from '@/components/UI/Button';
import { Badge } from '@/components/UI/Badge';
import { Subheading } from '@/components/UI/Typography';

interface Props {
  assistant: Assistant;
}

const AssistantCard = ({ assistant }: Props) => {
  const openModal = useAssistantStore((state) => state.openModal);
  const { deleteMutation } = useAssistants();

  const handleDelete = () => {
    if (confirm('¿Estás seguro de que deseas eliminar este asistente?')) {
      deleteMutation.mutate(assistant.id);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">

        <Subheading className="text-slate-800 dark:text-slate-100 font-bold">
          {assistant.name}
        </Subheading>

        <div className="flex gap-1">

          <Button
            variant="ghost"
            className="p-2 h-auto"
            onClick={() => openModal('edit', assistant)}
            title="Editar"
          >
            <Edit2 size={18} className="text-slate-400 hover:text-blue-600" />
          </Button>

          <Button
            variant="ghost"
            className="p-2 h-auto"
            onClick={handleDelete}
            isLoading={deleteMutation.isPending}
            title="Eliminar"
          >
            <Trash2 size={18} className="text-slate-400 hover:text-red-600" />
          </Button>
        </div>
      </div>


      <div className="flex flex-wrap gap-2 mb-6">
        <Badge variant="slate">
          <div className="flex items-center gap-1">
            <Languages size={14} />
            {assistant.language}
          </div>
        </Badge>
        <Badge variant="blue">
          <div className="flex items-center gap-1">
            <Smile size={14} />
            {assistant.tone}
          </div>
        </Badge>
      </div>


      <Link href={`/assistant/${assistant.id}`} passHref>
        <Button
          variant="secondary"
          className="w-full justify-center gap-2 py-2.5"
          icon={MessageSquare}
        >
          Entrenar y Probar
        </Button>
      </Link>
    </div>
  );
};

export { AssistantCard };