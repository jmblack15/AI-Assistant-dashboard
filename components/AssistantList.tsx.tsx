import { useAssistants } from '../hooks/useAssistants';
import { AssistantCard } from './AssistantCard';
import { PlusCircle } from 'lucide-react';
import { useAssistantStore } from '../store/useAssistantStore';


import { Button } from '@/components/UI/Button';
import { Heading, Paragraph } from '@/components/UI/Typography';
import { CardSkeleton } from '@/components/UI/CardSkeleton';

const AssistantList = () => {
  const { assistantsQuery } = useAssistants();
  const { assistants, searchQuery, openModal } = useAssistantStore();

  const sourceData = assistants.length > 0 ? assistants : (assistantsQuery.data || []);

  const filteredAssistants = sourceData.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (assistantsQuery.isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (sourceData.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 transition-colors">
        <Heading className="text-xl mb-2">No hay asistentes aún</Heading>
        <Paragraph>Comienza creando tu primer asistente de IA para automatizar tus ventas.</Paragraph>
        <Button
          onClick={() => openModal('create')}
          icon={PlusCircle}
          className="rounded-full px-8 py-6 text-lg mx-auto shadow-lg mt-4"
        >
          Crear Primer Asistente
        </Button>
      </div>
    );
  }

  if (filteredAssistants.length === 0 && searchQuery !== '') {
    return (
      <div className="text-center py-20">
        <Heading className="text-lg text-slate-400">
          No se encontraron resultados para "{searchQuery}"
        </Heading>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
      {filteredAssistants.map((assistant) => (
        <AssistantCard key={assistant.id} assistant={assistant} />
      ))}
    </div>
  );
};

export { AssistantList };