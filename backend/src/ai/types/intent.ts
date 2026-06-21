export enum IntentType {
  RECORD_SALE = 'RECORD_SALE',
  RECORD_PURCHASE = 'RECORD_PURCHASE',
  CHECK_INVENTORY = 'CHECK_INVENTORY',
  CHECK_ANALYTICS = 'CHECK_ANALYTICS',
  GENERAL_QUERY = 'GENERAL_QUERY',
  UNKNOWN = 'UNKNOWN',
}

export interface IntentResult {
  type: IntentType;
  confidence: number;
  extractedEntities: Record<string, any>;
  originalText: string;
}

export interface IntentParserConfig {
  threshold: number;
}
