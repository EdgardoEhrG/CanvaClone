'use client';

import { JSX, useCallback, useEffect, useRef, useState } from 'react';

import { useEditor } from '../hooks/use-editor';

import { Canvas } from 'fabric';
import { NavBar } from './navbar';
import { SideBar } from './sidebar';
import { ToolBar } from './toolbar';
import { Footer } from './footer';
import { ShapeSideBar } from './shape-sidebar';

import { ActiveTool } from '@/types';

const Editor = (): JSX.Element => {
  const { init, editor } = useEditor();

  const [activeTool, setActiveTool] = useState<ActiveTool>('select');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new Canvas(canvasRef.current!, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({ initialCanvas: canvas, initialContainer: containerRef.current! });

    return () => {
      canvas.dispose();
    };
  }, [init]);

  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === activeTool) {
        return setActiveTool('select');
      }

      if (tool === 'draw') {
        //
      }

      if (activeTool === 'draw') {
        //
      }

      setActiveTool(tool);
    },
    [activeTool]
  );

  return (
    <div className="h-full flex flex-col">
      <NavBar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
      <div className="absolute h-[calc(100%-68px)] w-full top-17 flex">
        <SideBar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ShapeSideBar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <main className="bg-muted flex-1 overflow-auto relative flex flex-col border-gray-700">
          <ToolBar />
          <div
            className="flex-1 h-[calc(100%-124px)] bg-muted"
            ref={containerRef}
          >
            <canvas ref={canvasRef} />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Editor;
