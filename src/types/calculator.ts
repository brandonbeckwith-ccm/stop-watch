export interface HistoryItem {
  expression: string;
  result: string;
  timestamp: Date;
}

export type CalculatorButtons = {
  label?: string;
  iconClass?: string;
  action?: () => void;
  class?: string;
};
