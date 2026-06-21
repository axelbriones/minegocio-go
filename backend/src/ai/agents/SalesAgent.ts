import { BaseAgent, AgentResponse } from '../types/agent';
import { PromptEngine } from '../core/PromptEngine';
import { AgentContext } from '../types';

export class SalesAgent implements BaseAgent {
  constructor(private promptEngine: PromptEngine) {}

  public async process(input: string, context: AgentContext): Promise<AgentResponse> {
    const messages = this.promptEngine.createMessages('sales_agent', input, context);

    // TODO: Call LLM to parse sales commands
    // - Extract products sold
    // - Extract total price
    // - Identify payment method
    console.log('SalesAgent processing:', messages);

    return {
      success: true,
      message: 'Sale parsed successfully. Please confirm.',
      requiresConfirmation: true,
      data: {
        operation: 'RECORD_SALE',
        extractedItems: [],
        total: 0
      }
    };
  }
}
