'use client';

import { JSX } from 'react';

import { ChromePicker, CirclePicker, RGBColor } from 'react-color';

import { colors } from '@/types';

import { convertRGBAObjToString } from '@/utils';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker = ({
  value,
  onChange,
}: ColorPickerProps): JSX.Element => {
  const changeColor = (color: RGBColor): void => {
    const formattedVal = convertRGBAObjToString(color);
    onChange(formattedVal);
  };

  return (
    <div className="w-full space-y-4">
      <ChromePicker
        className="border rounded-lg"
        color={value}
        onChange={(color) => {
          changeColor(color.rgb);
        }}
      />
      <CirclePicker
        color={value}
        colors={colors}
        onChangeComplete={(color) => {
          changeColor(color.rgb);
        }}
      />
    </div>
  );
};
