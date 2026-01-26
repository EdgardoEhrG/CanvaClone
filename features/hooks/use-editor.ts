import { useCallback, useMemo, useState } from 'react';

import { Canvas, Circle, Polygon, Rect, Shadow, Triangle } from 'fabric';
import type { FabricObject } from 'fabric';

import { useAutoResize } from './use-auto-resize';

import { BuildEditorProps, Editor } from '@/types';

import { CIRCLE_OPTIONS, RECTANGLE_OPTIONS, TRIANGLE_OPTIONS } from '@/consts';

interface InitialCanvasProps {
  initialCanvas: Canvas;
  initialContainer: HTMLDivElement;
}

const buildEditor = ({ canvas }: BuildEditorProps): Editor => {
  const getWorkspace = () => {
    return canvas.getObjects().find((obj) => obj.get('name') === 'clip');
  };

  const centerElement = (object: FabricObject) => {
    const workspace = getWorkspace();
    const center = workspace?.getCenterPoint();

    if (!center) return;

    canvas._centerObject(object, center);
  };

  const addToCanvas = (object: FabricObject) => {
    centerElement(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  };

  return {
    addCircle: () => {
      const obj = new Circle({
        ...CIRCLE_OPTIONS,
      });

      addToCanvas(obj);
    },

    addSoftRectangle: () => {
      const obj = new Rect({
        ...RECTANGLE_OPTIONS,
        rx: 50,
        ry: 50,
      });

      addToCanvas(obj);
    },

    addRectangle: () => {
      const obj = new Rect({
        ...RECTANGLE_OPTIONS,
      });

      addToCanvas(obj);
    },

    addTriangle: () => {
      const obj = new Triangle({
        ...TRIANGLE_OPTIONS,
      });

      addToCanvas(obj);
    },

    addInverseTriangle: () => {
      const obj = new Triangle({
        ...TRIANGLE_OPTIONS,
        angle: 180,
      });

      addToCanvas(obj);
    },

    addDiamond: () => {
      const obj = new Polygon(
        [
          { x: 200, y: 0 },
          { x: 400, y: 200 },
          { x: 200, y: 400 },
          { x: 0, y: 200 },
        ],
        {
          ...RECTANGLE_OPTIONS,
        }
      );

      addToCanvas(obj);
    },
  };
};

export const useEditor = () => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useAutoResize({ canvas, container });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({ canvas });
    }

    return undefined;
  }, [canvas]);

  const init = useCallback(
    ({ initialCanvas, initialContainer }: InitialCanvasProps) => {
      const initialWorkspace = new Rect({
        width: 1200,
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

  return { init, editor };
};
