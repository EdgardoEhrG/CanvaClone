import { Canvas } from 'fabric';
import { useCallback, useEffect } from 'react';

import * as fabric from 'fabric';

interface AutoResizeProps {
  canvas: Canvas | null;
  container: HTMLDivElement | null;
}

export const useAutoResize = ({ canvas, container }: AutoResizeProps) => {
  const autoZoom = useCallback(() => {
    if (!canvas || !container) {
      return;
    }

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    const center = canvas.getCenterPoint();
    const zoomRatio: number = 0.85;

    const localWorkspace = canvas
      .getObjects()
      .find((obj) => obj.type === 'rect' && obj.get('name') === 'clip');

    const scale = fabric.util.findScaleToFit(localWorkspace!, {
      width,
      height,
    });
    const zoom = zoomRatio * scale;

    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

    canvas.zoomToPoint(new fabric.Point(center.x, center.y), zoom);

    if (!localWorkspace) return;

    const workspaceCenter = localWorkspace.getCenterPoint();
    const currentTransform = canvas.viewportTransform;
    const newViewportTransform = [...currentTransform] as [
      number,
      number,
      number,
      number,
      number,
      number,
    ];

    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();

    if (!canvasWidth || !canvasHeight) {
      return;
    }

    newViewportTransform[4] =
      canvasWidth / 2 - workspaceCenter.x * newViewportTransform[0];
    newViewportTransform[5] =
      canvasHeight / 2 - workspaceCenter.y * newViewportTransform[3];

    canvas.setViewportTransform(newViewportTransform);
    canvas.requestRenderAll();

    canvas.requestRenderAll();
  }, [canvas, container]);

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    if (canvas && container) {
      resizeObserver = new ResizeObserver(() => {
        autoZoom();
      });

      resizeObserver.observe(container);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [canvas, container, autoZoom]);
};
