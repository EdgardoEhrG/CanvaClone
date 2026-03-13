'use client';

import { JSX } from 'react';

import { cn } from '@/lib/utils';

import { ActiveTool, Editor } from '@/types';

import { ToolSidebarHeader } from './tool-sidebar-header';
import { ToolSidebarClose } from './tool-sidebar-close';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { ColorPicker } from './color-picker';

import { STROKE_COLOR } from '@/consts';

interface StrokeColorSidebarProps {
  activeTool: ActiveTool;
  editor: Editor | undefined;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const StrokeColorSidebar = ({
  activeTool,
  editor,
  onChangeActiveTool,
}: StrokeColorSidebarProps): JSX.Element => {
  const handleClose = (): void => {
    onChangeActiveTool('select');
  };

  const value = editor?.getActiveStrokeColor() || STROKE_COLOR;

  const handleChange = (value: string): void => {
    editor?.changeStrokeColor(value);
  };

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-40 w-90 h-full flex flex-col',
        activeTool === 'stroke-color' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader
        title="Stroke color"
        description="Change stroke color to element"
      />
      <ScrollArea>
        <div className="p-4 space-y-6 ">
          <ColorPicker value={value} onChange={handleChange} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={handleClose} />
    </aside>
  );
};
