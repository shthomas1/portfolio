export interface NowItem {
  label?: string;
  text: string;
}

export interface NowData {
  status?: string;
  headline?: string;
  updated?: string;
  items?: NowItem[];
  footer?: string;
}
