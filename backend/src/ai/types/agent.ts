export interface AgentResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
  requiresConfirmation?: boolean;
}

export interface BaseAgent {
  process(input: string | any, context: any): Promise<AgentResponse>;
}
