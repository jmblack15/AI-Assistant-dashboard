'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAssistantStore } from '@/store/useAssistantStore';
import { Button } from '@/components/UI/Button';
import { Heading, Subheading } from '@/components/UI/Typography';
import { Badge } from '@/components/UI/Badge';
import { ChevronLeft, Save, RefreshCw, Send } from 'lucide-react';
import { Message } from '@/types/assistant';

export default function TrainingPage() {
  const { id } = useParams();
  const router = useRouter();

  // 1. Extraer las funciones con los nombres correctos del store
  const {
    assistants,
    updateAssistant,
    chatHistories,
    addChatMessage,
    clearChat
  } = useAssistantStore();

  const assistant = assistants.find(a => a.id === id);

  const [rules, setRules] = useState(assistant?.rules || '');
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const mockResponses = [
    "Entendido, ¿en qué más puedo ayudarte?",
    "Esa es una excelente pregunta. Déjame explicarte...",
    "Claro, con gusto te ayudo con eso.",
    "¿Podrías darme más detalles sobre tu consulta?",
    "Perfecto, he registrado esa información."
  ];

  if (!assistant) return <div className="p-10 text-center">Asistente no encontrado</div>;

  const handleSaveRules = async () => {
    setIsSaving(true);
    await new Promise(res => setTimeout(res, 800));
    updateAssistant({ ...assistant, rules });
    setIsSaving(false);
    alert('Entrenamiento guardado con éxito');
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    addChatMessage(assistant.id, userMessage);
    setInput('');
    setIsTyping(true);

    await new Promise(res => setTimeout(res, 1000 + Math.random() * 1000));

    const randomReply = mockResponses[Math.floor(Math.random() * mockResponses.length)];

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: randomReply,
      timestamp: new Date().toISOString(),
    };

    addChatMessage(assistant.id, assistantMessage);
    setIsTyping(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={() => router.push('/')} icon={ChevronLeft}>Volver</Button>
        <div>
          <Heading>{assistant.name}</Heading>
          <div className="flex gap-2 mt-2">
            <Badge variant="slate">{assistant.language}</Badge>
            <Badge variant="blue">{assistant.tone}</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <Subheading className="mb-4 text-slate-900 dark:text-white">Instrucciones de Entrenamiento</Subheading>
          <textarea
            className="w-full h-64 p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            placeholder="Escribe las reglas o el prompt para tu asistente..."
            value={rules}
            onChange={(e) => setRules(e.target.value)}
          />
          <Button
            className="w-full mt-4"
            icon={Save}
            onClick={handleSaveRules}
            isLoading={isSaving}
          >
            Guardar Entrenamiento
          </Button>
        </section>

        <section className="bg-slate-100 dark:bg-slate-950 rounded-xl flex flex-col h-[500px] border border-slate-200 dark:border-slate-800">
          <div className="p-4 border-b dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 rounded-t-xl">
            <span className="font-bold text-sm text-slate-700 dark:text-slate-200">Chat de Prueba</span>
            <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => clearChat(assistant.id)} title="Reiniciar chat">
              <RefreshCw size={16} />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {(chatHistories[assistant.id] || []).map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-none'
                  }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 p-2 rounded-lg text-xs animate-pulse">
                  Asistente escribiendo...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-slate-900 border-t dark:border-slate-800 rounded-b-xl flex gap-2">
            <input
              className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Escribe un mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type="submit" className="px-3" icon={Send} />
          </form>
        </section>
      </div>
    </div>
  );
}