import type { RGBColor } from 'react-color';

export const isTextType = (type: string | undefined): boolean => {
  return type === 'string' || type === 'i-text' || type === 'textbox';
};

export const convertRGBAObjToString = (
  rgba: RGBColor | 'transparent'
): string => {
  if (rgba === 'transparent') return 'rgba(0,0,0,0)';

  const a = rgba.a === undefined ? 1 : rgba.a;

  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${a}`;
};
