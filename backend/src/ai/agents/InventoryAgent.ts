import { BaseAgent, AgentResponse } from '../types/agent';
import { PromptEngine } from '../core/PromptEngine';
import { AgentContext } from '../types';

export class InventoryAgent implements BaseAgent {
  constructor(private promptEngine: PromptEngine) {}

  public async process(input: string, context: AgentContext): Promise<AgentResponse> {
    const messages = this.promptEngine.createMessages('inventory_agent', input, context);

    // TODO: Call LLM to parse specific inventory commands
    // - Add product
    // - Update stock
    // - Check availability
    console.log('InventoryAgent processing:', messages);

    return {
      success: true,
      message: 'Inventory operation parsed successfully',
      data: {
        operation: 'CHECK_STOCK',
        query: input
      }
    };
  }
}
