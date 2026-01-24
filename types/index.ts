import { LucideIcon } from 'lucide-react';

export type SideBarElement = {
  id: number;
  icon: LucideIcon;
  label: string;
  toolName: ActiveTool;
};

export type ActiveTool =
  | 'select'
  | 'shapes'
  | 'text'
  | 'images'
  | 'draw'
  | 'fill'
  | 'stroke-color'
  | 'stroke-width'
  | 'font'
  | 'opacity'
  | 'filter'
  | 'settings'
  | 'ai'
  | 'remove-bg'
  | 'templates';
