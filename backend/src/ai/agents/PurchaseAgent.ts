import { BaseAgent, AgentResponse } from '../types/agent';
import { PromptEngine } from '../core/PromptEngine';
import { AgentContext } from '../types';

export class PurchaseAgent implements BaseAgent {
  constructor(private promptEngine: PromptEngine) {}

  public async process(input: string, context: AgentContext): Promise<AgentResponse> {
    const messages = this.promptEngine.createMessages('purchase_agent', input, context);

    // TODO: Call LLM to parse purchase commands
    // - Extract products bought
    // - Extract supplier info
    // - Extract cost
    console.log('PurchaseAgent processing:', messages);

    return {
      success: true,
      message: 'Purchase parsed successfully. Please confirm.',
      requiresConfirmation: true,
      data: {
        operation: 'RECORD_PURCHASE',
        extractedItems: [],
        totalCost: 0
      }
    };
  }
}
