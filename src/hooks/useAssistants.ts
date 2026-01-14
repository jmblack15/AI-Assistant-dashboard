import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAssistantStore } from '../store/useAssistantStore';
import { Assistant } from '../types/assistant';

const delay = (ms?: number) => new Promise(res => setTimeout(res, ms || Math.random() * 400 + 100));

export const useAssistants = () => {
  const queryClient = useQueryClient();
  const { assistants, setAssistants, addAssistant, updateAssistant, deleteAssistant } = useAssistantStore();

  const assistantsQuery = useQuery({
    queryKey: ['assistants'],
    queryFn: async () => {
      await delay();
      return assistants;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newAssistant: Assistant) => {
      await delay();
      addAssistant(newAssistant);
      return newAssistant;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assistants'] }); 
    },
  });


  const updateMutation = useMutation({
    mutationFn: async (updatedAssistant: Assistant) => {
      await delay();
      updateAssistant(updatedAssistant);
      return updatedAssistant;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assistants'] });
    },
  });


  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await delay();
      

      if (Math.random() < 0.1) {
        throw new Error('Error al eliminar el asistente. Inténtalo de nuevo.');
      }
      
      deleteAssistant(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assistants'] }); 
    },
  });

  return {
    assistantsQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};