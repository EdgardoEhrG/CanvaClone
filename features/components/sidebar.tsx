'use client';

import { JSX } from 'react';

import {
  LayoutTemplate,
  ImageIcon,
  Settings,
  Shapes,
  Sparkles,
  Type,
} from 'lucide-react';

import { SideBarItem } from './sidebar-item';

import type { ActiveTool, SideBarElement } from '@/types';

const sideBarMenuElements: SideBarElement[] = [
  {
    id: 1,
    icon: LayoutTemplate,
    label: 'Design',
    toolName: 'templates',
  },
  {
    id: 2,
    icon: ImageIcon,
    label: 'Image',
    toolName: 'images',
  },
  {
    id: 3,
    icon: Type,
    label: 'Text',
    toolName: 'text',
  },
  {
    id: 4,
    icon: Shapes,
    label: 'Shapes',
    toolName: 'shapes',
  },
  {
    id: 5,
    icon: Sparkles,
    label: 'AI',
    toolName: 'ai',
  },
  {
    id: 6,
    icon: Settings,
    label: 'Settings',
    toolName: 'settings',
  },
];

interface SideBarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const SideBar = ({
  activeTool,
  onChangeActiveTool,
}: SideBarProps): JSX.Element => {
  return (
    <aside className="bg-white flex flex-col w-25 h-full border-r overflow-y-auto">
      <ul className="flex flex-col">
        {sideBarMenuElements.map((element) => {
          return (
            <SideBarItem
              key={element.id}
              label={element.label}
              icon={element.icon}
              isActive={activeTool === element.toolName}
              onClick={() => onChangeActiveTool(element.toolName)}
            />
          );
        })}
      </ul>
    </aside>
  );
};
