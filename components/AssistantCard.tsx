import { Assistant } from '../types/assistant';
import { useAssistantStore } from '../store/useAssistantStore';
import { useAssistants } from '../hooks/useAssistants';
import { Edit2, Trash2, MessageSquare, Languages, Smile } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';


import { Button } from '@/components/UI/Button';
import { Badge } from '@/components/UI/Badge';
import { Heading, Paragraph } from '@/components/UI/Typography';

interface Props {
  assistant: Assistant;
}

const AssistantCard = ({ assistant }: Props) => {
  const openModal = useAssistantStore((state) => state.openModal);
  const { deleteMutation } = useAssistants();

  const handleDelete = async () => {
    const promise = deleteMutation.mutateAsync(assistant.id);
    toast.promise(promise, {
      loading: `Eliminando a ${assistant.name}...`,
      success: () => {
        return `El asistente ${assistant.name} ha sido eliminado.`;
      },
      error: (err) => {
        return err.message || 'No se pudo eliminar el asistente';
      },
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">

        <div className='flex  flex-col flex-wrap'>
          <Paragraph className='text-lg mb-0'>Nombre del Asistente :</Paragraph>
          <Heading className="text-slate-800 dark:text-slate-100 font-bold">
            {assistant.name}
          </Heading>
        </div>
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


      <div className="flex flex-wrap gap-2 mb-6">
        <div className='flex flex-col items-center'>
          <Paragraph className='mb-2'>Idioma</Paragraph>
          <Badge variant="blue">
            <div className="flex items-center gap-1">
              <Languages size={14} />
              {assistant.language}
            </div>
          </Badge>
        </div>
        <div className='flex flex-col items-center'>
          <Paragraph className='mb-2'>Tono</Paragraph>
          <Badge variant="slate">
            <div className="flex items-center gap-1">
              <Smile size={14} />
              {assistant.tone}
            </div>
          </Badge>
        </div>

      </div>

      <div className='flex flex-row gap-2 w-full items-center'>
        <Button
          variant="secondary"
          className="w-[40%] justify-center gap-2 py-2.5"
          onClick={() => openModal('edit', assistant)}
          title="Editar"
        >
          <Edit2 size={18} className="text-slate-400 hover:text-blue-600" /> Editar
        </Button>

        <Link className='w-[60%]' href={`/assistant/${assistant.id}`} passHref>
          <Button
            variant="secondary"
            className="justify-center gap-2 py-2.5"
            icon={MessageSquare}
          >
            Entrenar y Probar
          </Button>
        </Link>
      </div>
    </div >
  );
};

export { AssistantCard };