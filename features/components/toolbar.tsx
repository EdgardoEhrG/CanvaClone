'use client';

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ActiveTool, Editor } from '@/types';
import { JSX } from 'react';

interface ToolbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Toolbar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ToolbarProps): JSX.Element => {
  const selectedObject = editor?.canvas.getActiveObject();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getProperty = (property: any) => {
    if (!selectedObject) return null;
    return selectedObject.get(property);
  };

  const fillColor = getProperty('fill');

  if (!editor?.selectedObjects.length) {
    return (
      <div className="shrink-0 h-14 border-b bg-white w-full flex items-center overflow-x-auto z-49 p-2 gap-x-2"></div>
    );
  }

  return (
    <div className="shrink-0 h-14 border-b bg-white w-full flex items-center overflow-x-auto z-49 p-2 gap-x-2">
      <div className="flex items-center h-full justify-center">
        <Hint label="Color" side="bottom" sideOffset={5}>
          <Button
            className={cn(activeTool === 'fill' && 'bg-gray-100')}
            size="icon"
            variant="ghost"
            onClick={() => onChangeActiveTool('fill')}
          >
            <div
              className="rounded-sm size-4 border"
              style={{
                backgroundColor: fillColor,
              }}
            ></div>
          </Button>
        </Hint>
      </div>
    </div>
  );
};
