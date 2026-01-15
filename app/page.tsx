"use client";

import { AssistantList } from '@/components/AssistantList.tsx';
import { useAssistantStore } from '@/store/useAssistantStore';
import { Plus } from 'lucide-react';
import { Heading, Subheading } from '@/components/UI/Typography';
import { Button } from '@/components/UI/Button';
import { SearchInput } from '@/components/UI/SearchInput.tsx';


export default function Home() {

  const { openModal, searchQuery, setSearchQuery } = useAssistantStore();

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <Heading>Asistentes IA</Heading>
          <Subheading>Configura y entrena tus agentes personalizados</Subheading>
        </div>
      </header>

      <div className="flex flex-row flex-wrap gap-4 items-center mb-6 justify-between">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
        />

        <Button
          onClick={() => openModal('create')}
          icon={Plus}
          className=" h-20 px-3 py-3 h-auto text-base shadow-lg shadow-blue-500/20"
        >
          crear asistente
        </Button>
      </div>

      <AssistantList />
    </main>
  );
}
