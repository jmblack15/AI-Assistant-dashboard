"use client";

import { AssistantList } from '@/components/AssistantList.tsx';
import { useAssistantStore } from '@/store/useAssistantStore';
import { Plus } from 'lucide-react';
import { Heading, Subheading } from '@/components/UI/Typography';
import { Button } from '@/components/UI/Button';

export default function Home() {

  const openModal = useAssistantStore((state) => state.openModal);
  return (
    <main className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <Heading>Asistentes IA</Heading>
          <Subheading>Configura y entrena tus agentes personalizados</Subheading>
        </div>

        <Button onClick={() => openModal('create')} variant="primary" icon={Plus}>Crear Asistente</Button>
      </header>

      <AssistantList />
    </main>
  );
}
