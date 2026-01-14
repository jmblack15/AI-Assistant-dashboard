'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAssistantStore } from '@/store/useAssistantStore';
import { useAssistants } from '@/hooks/useAssistants';
import { Button } from '@/components/UI/Button';
import { InputField } from '@/components/UI/Typography';
import { Select } from '@/components/UI/Select';
import { Stepper } from "@/components/UI/Stepper";
import { Modal } from '@/components/UI/Modal';

export const AssistantModal = () => {
    const [step, setStep] = useState<number>(1);
    const { isModalOpen, closeModal, modalMode, selectedAssistant } = useAssistantStore();
    const { createMutation, updateMutation } = useAssistants();

    const { register, handleSubmit, watch, formState: { errors }, reset, trigger } = useForm({
        defaultValues: {
            name: '',
            language: 'Español',
            tone: 'Profesional',
            responseLength: { short: 30, medium: 50, long: 20 },
            audioEnabled: false
        }
    });

    // Efecto para cargar datos si estamos editando
    useEffect(() => {
        if (selectedAssistant) reset(selectedAssistant);
    }, [selectedAssistant, reset]);

    const handleNext = async () => {
        // Validar solo el paso 1 antes de avanzar [cite: 54]
        const isValid = await trigger(['name', 'language', 'tone']);
        if (isValid) setStep(2);
    };

    const onSubmit = (data: any) => {
        // Validación crítica: Suma debe ser 100% 
        const { short, medium, long } = data.responseLength;
        const total = Number(short) + Number(medium) + Number(long);

        if (total !== 100) {
            alert(`La suma debe ser 100%. Actual: ${total}%`); // Puedes usar un Toast aquí
            return;
        }

        if (modalMode === 'create') {
            createMutation.mutate({ ...data, id: crypto.randomUUID() });
        } else {
            updateMutation.mutate(data);
        }

        closeModal();
        setStep(1);
        reset();
    };

    return (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={modalMode === 'create' ? "Crear Asistente" : "Editar Asistente"}>
            <Stepper currentStep={step} />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {step === 1 ? (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                        <InputField
                            label="Nombre del asistente"
                            {...register('name', { required: "Requerido", minLength: 3 })}
                            error={errors.name?.message}
                        />
                        <Select
                            label="Idioma"
                            options={[{ value: 'Español', label: 'Español' }, { value: 'Inglés', label: 'Inglés' }, { value: 'Portugués', label: 'Portugués' }]}
                            {...register('language')}
                        />
                        <Select
                            label="Tono"
                            options={[{ value: 'Formal', label: 'Formal' }, { value: 'Casual', label: 'Casual' }, { value: 'Profesional', label: 'Profesional' }, { value: 'Amigable', label: 'Amigable' }]}
                            {...register('tone')}
                        />
                        <Button type="button" className="w-full" onClick={handleNext}>Siguiente</Button>
                    </div>
                ) : (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                        <div className="grid grid-cols-3 gap-3">
                            <InputField type="number" label="Cortas (%)" {...register('responseLength.short')} />
                            <InputField type="number" label="Medias (%)" {...register('responseLength.medium')} />
                            <InputField type="number" label="Largas (%)" {...register('responseLength.long')} />
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" {...register('audioEnabled')} className="w-4 h-4" />
                            <span className="text-sm">Habilitar respuestas de audio</span>
                        </label>

                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="secondary" className="flex-1" onClick={() => setStep(1)}>Atrás</Button>
                            <Button type="submit" className="flex-1" isLoading={createMutation.isPending || updateMutation.isPending}>
                                Guardar
                            </Button>
                        </div>
                    </div>
                )}
            </form>
        </Modal>
    );
};