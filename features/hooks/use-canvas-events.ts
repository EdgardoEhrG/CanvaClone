import { Canvas, FabricObject } from 'fabric';
import { useEffect } from 'react';

interface ICanvasEvents {
  canvas: Canvas | null;
  container: HTMLDivElement | null;
  setSelectedObjects: (objects: FabricObject[]) => void;
}

export const useCanvasEvents = ({
  canvas,
  container,
  setSelectedObjects,
}: ICanvasEvents) => {
  useEffect(() => {
    if (canvas) {
      canvas.on('selection:created', (e) => {
        setSelectedObjects(e.selected || []);
      });
      canvas.on('selection:updated', (e) => {
        setSelectedObjects(e.selected || []);
      });
      canvas.on('selection:cleared', (e) => {
        setSelectedObjects([]);
      });
    }

    return () => {
      if (canvas) {
        canvas.off('selection:created');
        canvas.off('selection:updated');
        canvas.off('selection:cleared');
      }
    };
  }, [canvas, setSelectedObjects]);
};
