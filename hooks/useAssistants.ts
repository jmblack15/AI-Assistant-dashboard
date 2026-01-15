import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAssistantStore } from '../store/useAssistantStore';
import { Assistant } from '../types/assistant';
import { toast } from 'sonner';

const delay = (ms?: number) => new Promise(res => setTimeout(res, ms || Math.random() * 400 + 100));

export const useAssistants = () => {
  const queryClient = useQueryClient();
  const { assistants, addAssistant, updateAssistant, deleteAssistant } = useAssistantStore();

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
      toast.loading('Eliminando asistente...');
      await delay();

      if (Math.random() < 0.1) {
        throw new Error('Error al eliminar el asistente. Inténtalo de nuevo.');
      }

      deleteAssistant(id);
      return id;
    },
    onSuccess: (id) => {
      toast.dismiss();
      toast.success('Asistente eliminado correctamente');
      queryClient.invalidateQueries({ queryKey: ['assistants'] });
    },
    onError: (error: any) => {
      toast.dismiss();
      toast.error(error.message || 'No se pudo eliminar');
    },
  });

  return {
    assistantsQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};