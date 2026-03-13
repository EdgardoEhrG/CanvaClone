import { Canvas, FabricObject } from 'fabric';
import { useEffect } from 'react';

interface ICanvasEvents {
  canvas: Canvas | null;
  container: HTMLDivElement | null;
  setSelectedObjects: (objects: FabricObject[]) => void;
  clearSelectionCallback?: () => void;
}

export const useCanvasEvents = ({
  canvas,
  setSelectedObjects,
  clearSelectionCallback,
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
        clearSelectionCallback?.();
      });
    }

    return () => {
      if (canvas) {
        canvas.off('selection:created');
        canvas.off('selection:updated');
        canvas.off('selection:cleared');
      }
    };
  }, [canvas, setSelectedObjects, clearSelectionCallback]);
};
