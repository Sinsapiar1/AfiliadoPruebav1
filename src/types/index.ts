export interface APIConfig {
  provider: 'gemini' | 'cohere' | 'together' | 'openai';
  apiKey: string;
  model?: string;
  isConfigured: boolean;
}

export interface Product {
  name: string;
  description: string;
  price: string;
  commission: string;
  score: string;
  gravity: string;
  epc: string;
  cvr: string;
  painPoints: string[];
  emotions: string[];
  triggers: string[];
}