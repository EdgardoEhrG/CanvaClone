'use client';

import { useEffect, useRef } from 'react';

import { useEditor } from '../hooks/use-editor';
import { Canvas } from 'fabric';
import { NavBar } from './navbar';
import { SideBar } from './sidebar';
import { ToolBar } from './toolbar';
import { Footer } from './footer';

const Editor = () => {
  const { init } = useEditor();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new Canvas(canvasRef.current!, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({ initialCanvas: canvas, initialContainer: containerRef.current! });
  }, [init]);

  return (
    <div className="h-full flex flex-col">
      <NavBar />
      <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
        <SideBar />
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
