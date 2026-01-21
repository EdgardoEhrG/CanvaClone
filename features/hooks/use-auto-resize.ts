import { Canvas } from 'fabric';
import { useCallback, useEffect } from 'react';

// import * as fabric from 'fabric';

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

    // const center = canvas.getCenterPoint();
    // const zoomRatio: number = 0.85;
    // const localWorkspace = canvas.getObjects().find((obj) => obj.name === 'clip')
    // const scale = fabric.util.findScaleToFit(localWorkspace, { width, height });
    // const zoom = zoomRatio * scale;

    // canvas.setViewportTransform(fabric.iMatrix.concat());
    // canvas.zoomToPoint(new fabric.Point(
    //     center.left,
    //     center.top,
    // ), zoom)

    // if (!localWorkspace) return;

    // const workspaceCenter = localWorkspace.getCenterPoint();
    // const viewportTransform = canvas.viewportTransform;

    // * add !viewportTransform below

    if (canvas.width === undefined || canvas.height === undefined) return;

    // viewportTransform[4] = canvas.width / 2 - workspaceCenter.x * viewportTransform[0];
    // viewportTransform[5] = canvas.height / 2 - workspaceCenter.y * viewportTransform[3];

    // canvas.setViewportTransform(viewportTransform)

    canvas.setDimensions({ width, height });

    /* localWorkspace.clone((cloned: fabric.Rect) => {
        canvas.clipPath = cloned;
        canvas.requestRenderAll();
    })
    */
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
