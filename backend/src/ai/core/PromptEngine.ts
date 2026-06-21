import { Message, PromptTemplate, AgentContext } from '../types';

export class PromptEngine {
  private templates: Map<string, PromptTemplate> = new Map();

  constructor() {
    this.initializeTemplates();
  }

  private initializeTemplates() {
    this.registerTemplate({
      id: 'intent_parser',
      variables: ['date', 'shopId'],
      template: `You are MIGO, the AI assistant for 'MI NEGOCIO GO'. Your goal is to parse user intents accurately.
Today is {{date}}. Shop ID: {{shopId}}.
Classify the following text into one of these intents: RECORD_SALE, RECORD_PURCHASE, CHECK_INVENTORY, CHECK_ANALYTICS, GENERAL_QUERY.`
    });

    this.registerTemplate({
      id: 'inventory_agent',
      variables: [],
      template: `You are MIGO's Inventory Agent. Your job is to help the user manage their products.`
    });

    this.registerTemplate({
      id: 'sales_agent',
      variables: [],
      template: `You are MIGO's Sales Agent. Your job is to help the user record and manage sales.`
    });

    this.registerTemplate({
      id: 'purchase_agent',
      variables: [],
      template: `You are MIGO's Purchase Agent. Your job is to help the user record and manage purchases.`
    });

    this.registerTemplate({
      id: 'analytics_agent',
      variables: [],
      template: `You are MIGO's Analytics Agent. Your job is to provide insights and reports based on sales and purchases.`
    });

    this.registerTemplate({
        id: 'vision_agent',
        variables: [],
        template: `You are MIGO's Vision Agent. Your job is to extract product details from images.`
    });

    this.registerTemplate({
        id: 'voice_agent',
        variables: [],
        template: `You are MIGO's Voice Agent. Your job is to transcribe audio and interpret commands.`
    });
  }

  public registerTemplate(template: PromptTemplate) {
    this.templates.set(template.id, template);
  }

  public generateSystemPrompt(templateId: string, context: AgentContext): string {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error(`Template with id ${templateId} not found.`);
    }

    let prompt = template.template;

    // Replace variables in the template
    for (const variable of template.variables) {
      const value = context[variable] !== undefined ? String(context[variable]) : '';
      prompt = prompt.replace(new RegExp(`{{${variable}}}`, 'g'), value);
    }

    // Add common context
    if (context.currentDate) {
        prompt += `\n\nCurrent context:\nDate: ${context.currentDate.toISOString()}`;
    }

    return prompt;
  }

  public createMessages(templateId: string, userMessage: string, context: AgentContext): Message[] {
    const systemPrompt = this.generateSystemPrompt(templateId, context);

    return [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ];
  }
}
