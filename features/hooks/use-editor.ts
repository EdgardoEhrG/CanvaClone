import { useCallback, useMemo, useState } from 'react';

import { Canvas, Circle, Polygon, Rect, Shadow, Triangle } from 'fabric';
import { FabricObject } from 'fabric';

import { useAutoResize } from './use-auto-resize';

import { BuildEditorProps, Editor } from '@/types';

import {
  CIRCLE_OPTIONS,
  FILL_COLOR,
  RECTANGLE_OPTIONS,
  STROKE_COLOR,
  STROKE_WIDTH,
  TRIANGLE_OPTIONS,
} from '@/consts';
import { useCanvasEvents } from './use-canvas-events';
import { isTextType } from '@/utils';

interface InitialCanvasProps {
  initialCanvas: Canvas;
  initialContainer: HTMLDivElement;
}

const buildEditor = ({
  canvas,
  fillColor,
  strokeColor,
  strokeWidth,
  selectedObjects,
  setFillColor,
  setStrokeColor,
  setStrokeWidth,
}: BuildEditorProps): Editor => {
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
    changeFillColor: (value: string) => {
      setFillColor(value);
      canvas.getActiveObjects().forEach((obj) => {
        obj.set({ fill: value });
      });
      canvas.renderAll();
    },
    changeStrokeColor: (value: string) => {
      setStrokeColor(value);
      canvas.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          obj.set({ fill: value });
          return;
        }
        obj.set({ stroke: value });
      });
      canvas.renderAll();
    },
    changeStrokeWidth: (value: number) => {
      setStrokeWidth(value);
      canvas.getActiveObjects().forEach((obj) => {
        obj.set({ strokeWidth: value });
      });
      canvas.renderAll();
    },

    addCircle: () => {
      const obj = new Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });

      addToCanvas(obj);
    },

    addSoftRectangle: () => {
      const obj = new Rect({
        ...RECTANGLE_OPTIONS,
        rx: 50,
        ry: 50,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });

      addToCanvas(obj);
    },

    addRectangle: () => {
      const obj = new Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });

      addToCanvas(obj);
    },

    addTriangle: () => {
      const obj = new Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });

      addToCanvas(obj);
    },

    addInverseTriangle: () => {
      const obj = new Triangle({
        ...TRIANGLE_OPTIONS,
        angle: 180,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
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
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
        }
      );

      addToCanvas(obj);
    },

    canvas,
    fillColor,
    strokeColor,
    strokeWidth,
    selectedObjects,
  };
};

export const useEditor = () => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<FabricObject[]>([]);

  const [fillColor, setFillColor] = useState<string>(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState<string>(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState<number>(STROKE_WIDTH);

  useAutoResize({ canvas, container });

  useCanvasEvents({
    canvas,
    container,
    setSelectedObjects,
  });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
        fillColor,
        strokeColor,
        strokeWidth,
        selectedObjects,
        setFillColor,
        setStrokeColor,
        setStrokeWidth,
      });
    }

    return undefined;
  }, [canvas, fillColor, strokeColor, strokeWidth, selectedObjects]);

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
