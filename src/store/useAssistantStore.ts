import { create } from 'zustand';
import { Assistant, Message } from '../types/assistant';

interface AssistantState {

  assistants: Assistant[];
  selectedAssistant: Assistant | null;
  chatHistories: Record<string, Message[]>; 

  isModalOpen: boolean;
  modalMode: 'create' | 'edit';

  setAssistants: (assistants: Assistant[]) => void;
  addAssistant: (assistant: Assistant) => void;
  updateAssistant: (assistant: Assistant) => void;
  deleteAssistant: (id: string) => void;

  openModal: (mode: 'create' | 'edit', assistant?: Assistant) => void;
  closeModal: () => void;
  

  addChatMessage: (assistantId: string, message: Message) => void;
  clearChat: (assistantId: string) => void;
}

const initialData: Assistant[] = [
  {
    id: "1",
    name: "Asistente de Ventas",
    language: "Español",
    tone: "Profesional",
    responseLength: { short: 30, medium: 50, long: 20 },
    audioEnabled: true,
    rules: "Eres un asistente especializado en ventas..."
  }
];

export const useAssistantStore = create<AssistantState>((set) => ({
  assistants: initialData,
  selectedAssistant: null,
  chatHistories: {},
  isModalOpen: false,
  modalMode: 'create',

  setAssistants: (assistants) => set({ assistants }),

  addAssistant: (assistant) => 
    set((state) => ({ assistants: [...state.assistants, assistant] })),

  updateAssistant: (updatedAssistant) =>
    set((state) => ({
      assistants: state.assistants.map((a) => 
        a.id === updatedAssistant.id ? updatedAssistant : a
      ),
    })),

  deleteAssistant: (id) =>
    set((state) => ({
      assistants: state.assistants.filter((a) => a.id !== id),
    })),

  openModal: (mode, assistant) => 
    set({ 
      isModalOpen: true, 
      modalMode: mode, 
      selectedAssistant: assistant || null 
    }),

  closeModal: () => 
    set({ isModalOpen: false, selectedAssistant: null }),

  addChatMessage: (assistantId, message) =>
    set((state) => ({
      chatHistories: {
        ...state.chatHistories,
        [assistantId]: [...(state.chatHistories[assistantId] || []), message],
      },
    })),

  clearChat: (assistantId) =>
    set((state) => ({
      chatHistories: { ...state.chatHistories, [assistantId]: [] },
    })),
}));