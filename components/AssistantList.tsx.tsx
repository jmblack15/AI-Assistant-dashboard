import { useAssistants } from '../hooks/useAssistants';
import { AssistantCard } from './AssistantCard';
import { PlusCircle } from 'lucide-react';
import { useAssistantStore } from '../store/useAssistantStore';


import { Button } from '@/components/UI/Button';
import { Heading, Paragraph } from '@/components/UI/Typography';
import { CardSkeleton } from '@/components/UI/CardSkeleton';

const AssistantList = () => {
  const { assistantsQuery } = useAssistants();
  const openModal = useAssistantStore((state) => state.openModal);


  if (assistantsQuery.isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!assistantsQuery.data || assistantsQuery.data.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 transition-colors">
        <Heading className="text-xl mb-2">No hay asistentes aún</Heading>
        <Paragraph>Comienza creando tu primer asistente de IA para automatizar tus ventas.</Paragraph>
        <Button
          onClick={() => openModal('create')}
          icon={PlusCircle}
          className="rounded-full px-8 py-6 text-lg mx-auto shadow-lg"
        >
          Crear Primer Asistente
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
      {assistantsQuery.data.map((assistant) => (
        <AssistantCard key={assistant.id} assistant={assistant} />
      ))}
    </div>
  );
};

export { AssistantList };