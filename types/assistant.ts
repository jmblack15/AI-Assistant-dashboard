export type AssistantTone = 'Formal' | 'Casual' | 'Profesional' | 'Amigable';
export type AssistantLanguage = 'Español' | 'Inglés' | 'Portugués';

export interface ResponseLength {
  short: number;
  medium: number;
  long: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string; 
}

export interface Assistant {
  id: string;
  name: string;
  language: AssistantLanguage;
  tone: AssistantTone;
  responseLength: ResponseLength;
  audioEnabled: boolean;
  rules: string;
}