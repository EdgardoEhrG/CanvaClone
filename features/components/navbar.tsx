'use client';

import { Button } from '@/components/ui/button';
import { Logo } from './logo';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
  ChevronDown,
  Download,
  MousePointerClick,
  Redo2,
  Undo2,
} from 'lucide-react';
import { CiFileOn } from 'react-icons/ci';
import { Hint } from '@/components/hint';
import { BsCloudCheck } from 'react-icons/bs';
import { ActiveTool } from '@/types';
import { cn } from '@/lib/utils';

interface NavBarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const NavBar = ({ activeTool, onChangeActiveTool }: NavBarProps) => {
  const handleUndo = () => {};

  const handleRedo = () => {};

  const exportFile = () => {};

  return (
    <nav className="w-full flex items-center p-4 h-17 gap-x-8 border-b lg:pl-8.5">
      <Logo />
      <div className="w-full flex items-center gap-x-1 h-full">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              File <ChevronDown className="size-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-60 z-50">
            <DropdownMenuItem className="flex items-center gap-x-2 bg-blue-200">
              <CiFileOn className="size-8" />
              <div>
                <p>Open</p>
                <p className="text-xs text-muted-foreground">
                  Open a JSON file
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="mx-2" />
        <Hint label="Select" side="bottom" sideOffset={10}>
          <Button
            size="icon"
            variant="ghost"
            className={cn(activeTool === 'select' && 'bg-gray-100')}
            onClick={() => onChangeActiveTool('select')}
          >
            <MousePointerClick className="size-4" />
          </Button>
        </Hint>
        <Hint label="Undo" side="bottom" sideOffset={10}>
          <Button size="icon" variant="ghost" onClick={handleUndo}>
            <Undo2 className="size-4" />
          </Button>
        </Hint>
        <Hint label="Redo" side="bottom" sideOffset={10}>
          <Button size="icon" variant="ghost" onClick={handleRedo}>
            <Redo2 className="size-4" />
          </Button>
        </Hint>
        <Separator orientation="vertical" className="mx-2" />
        <div className="flex items-center gap-x-2">
          <BsCloudCheck className="size-5 text-muted-foreground" />
          <div className="text-xs text-muted-foreground">Saved</div>
        </div>
        <div className="ml-auto flex items-center gap-x-4">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost" onClick={exportFile}>
                Export <Download className="size-4 ml-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItem className="flex items-center gap-x-2 bg-blue-200">
                <CiFileOn className="size-8" />
                <div>
                  <p>JSON</p>
                  <p className="text-xs text-muted-foreground">Later editing</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-x-2 bg-blue-200">
                <CiFileOn className="size-8" />
                <div>
                  <p>PNG</p>
                  <p className="text-xs text-muted-foreground">
                    Sharing on the web
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-x-2 bg-blue-200">
                <CiFileOn className="size-8" />
                <div>
                  <p>JPG</p>
                  <p className="text-xs text-muted-foreground">Printing</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-x-2 bg-blue-200">
                <CiFileOn className="size-8" />
                <div>
                  <p>SVG</p>
                  <p className="text-xs text-muted-foreground">
                    Vector graphic
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
