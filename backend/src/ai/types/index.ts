export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface PromptTemplate {
  id: string;
  template: string;
  variables: string[];
}

export interface AgentContext {
  userId?: string;
  shopId?: string;
  language?: string;
  currentDate?: Date;
  [key: string]: any;
}
