'use client';

import { JSX } from 'react';

import { cn } from '@/lib/utils';

import { ActiveTool, Editor } from '@/types';
import { ToolSideBarHeader } from './tool-sidebar-header';
import { ToolSideBarClose } from './tool-sidebar-close';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { ShapeTool } from './shape-tool';
import { FaCircle, FaSquare, FaSquareFull } from 'react-icons/fa';
import { FaDiamond } from 'react-icons/fa6';
import { IoTriangle } from 'react-icons/io5';

interface ShapeSideBarProps {
  activeTool: ActiveTool;
  editor: Editor | undefined;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ShapeSideBar = ({
  activeTool,
  editor,
  onChangeActiveTool,
}: ShapeSideBarProps): JSX.Element => {
  const handleClose = (): void => {
    onChangeActiveTool('select');
  };

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-40 w-90 h-full flex flex-col',
        activeTool === 'shapes' ? 'visible' : 'hidden'
      )}
    >
      <ToolSideBarHeader title="Shapes" description="Add shape" />
      <ScrollArea>
        <div className="grid grid-cols-4 gap-4 p-4">
          <ShapeTool icon={FaCircle} onClick={() => editor?.addCircle()} />
          <ShapeTool
            icon={FaSquare}
            onClick={() => editor?.addSoftRectangle()}
          />
          <ShapeTool
            icon={FaSquareFull}
            onClick={() => editor?.addRectangle()}
          />
          <ShapeTool icon={IoTriangle} onClick={() => editor?.addTriangle()} />
          <ShapeTool
            iconClassName="rotate-180"
            icon={IoTriangle}
            onClick={() => {
              editor?.addInverseTriangle();
            }}
          />
          <ShapeTool icon={FaDiamond} onClick={() => editor?.addDiamond()} />
        </div>
      </ScrollArea>
      <ToolSideBarClose onClick={handleClose} />
    </aside>
  );
};
