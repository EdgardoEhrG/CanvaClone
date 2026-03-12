'use client';

import { JSX } from 'react';

import { cn } from '@/lib/utils';

import { ActiveTool, Editor } from '@/types';
import { ToolSidebarHeader } from './tool-sidebar-header';
import { ToolSidebarClose } from './tool-sidebar-close';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { ColorPicker } from './color-picker';
import { FILL_COLOR } from '@/consts';

interface FillColorSidebarProps {
  activeTool: ActiveTool;
  editor: Editor | undefined;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FillColorSidebar = ({
  activeTool,
  editor,
  onChangeActiveTool,
}: FillColorSidebarProps): JSX.Element => {
  const handleClose = (): void => {
    onChangeActiveTool('select');
  };

  const value = editor?.fillColor || FILL_COLOR;

  const handleChange = (value: string): void => {
    editor?.changeFillColor(value);
  };

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-40 w-90 h-full flex flex-col',
        activeTool === 'fill' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader
        title="Fill color"
        description="Change color to element"
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
