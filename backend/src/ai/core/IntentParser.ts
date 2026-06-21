import { IntentType, IntentResult, IntentParserConfig } from '../types/intent';
import { PromptEngine } from './PromptEngine';
import { AgentContext } from '../types';

export class IntentParser {
  private promptEngine: PromptEngine;
  private config: IntentParserConfig;

  constructor(promptEngine: PromptEngine, config?: Partial<IntentParserConfig>) {
    this.promptEngine = promptEngine;
    this.config = {
      threshold: 0.7,
      ...config,
    };
  }

  /**
   * Parses the user text to determine the intent.
   * In a real implementation, this would call an LLM with the generated prompt.
   */
  public async parseIntent(text: string, context: AgentContext): Promise<IntentResult> {
    const messages = this.promptEngine.createMessages('intent_parser', text, context);

    // TODO: Implement actual LLM call here using 'messages'
    // For now, this is a mock implementation based on keywords
    console.log('Sending to LLM:', JSON.stringify(messages, null, 2));

    const lowerText = text.toLowerCase();
    let type = IntentType.UNKNOWN;
    let confidence = 0.5;

    if (lowerText.includes('vend') || lowerText.includes('sale') || lowerText.includes('venta')) {
      type = IntentType.RECORD_SALE;
      confidence = 0.9;
    } else if (lowerText.includes('compr') || lowerText.includes('purchase')) {
      type = IntentType.RECORD_PURCHASE;
      confidence = 0.9;
    } else if (lowerText.includes('inventario') || lowerText.includes('stock') || lowerText.includes('producto')) {
      type = IntentType.CHECK_INVENTORY;
      confidence = 0.85;
    } else if (lowerText.includes('reporte') || lowerText.includes('analytics') || lowerText.includes('ganancia')) {
      type = IntentType.CHECK_ANALYTICS;
      confidence = 0.8;
    }

    // Mock entity extraction
    const entities: Record<string, any> = {};
    const numbers = text.match(/\\d+/g);
    if (numbers) {
      entities['quantities'] = numbers.map(Number);
    }

    if (confidence < this.config.threshold) {
      type = IntentType.UNKNOWN;
    }

    return {
      type,
      confidence,
      extractedEntities: entities,
      originalText: text,
    };
  }
}
