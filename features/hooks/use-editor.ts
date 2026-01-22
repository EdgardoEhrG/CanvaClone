import { useCallback, useState } from 'react';

import { Canvas, Rect, Shadow } from 'fabric';
import { useAutoResize } from './use-auto-resize';

interface InitialCanvasProps {
  initialCanvas: Canvas;
  initialContainer: HTMLDivElement;
}

export const useEditor = () => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useAutoResize({ canvas, container });

  const init = useCallback(
    ({ initialCanvas, initialContainer }: InitialCanvasProps) => {
      const initialWorkspace = new Rect({
        width: 900,
        height: 1200,
        fill: 'white',
        name: 'clip',
        selectable: false,
        hasControls: false,
        shadow: new Shadow({
          color: 'rgba(0,0,0,0.8)',
          blur: 5,
        }),
        data: { name: 'clip', type: 'workspace' },
      });

      initialCanvas.setDimensions({
        width: initialContainer.offsetWidth,
        height: initialContainer.offsetHeight,
      });

      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;

      setCanvas(initialCanvas);
      setContainer(initialContainer);
    },
    []
  );

  return { init };
};
