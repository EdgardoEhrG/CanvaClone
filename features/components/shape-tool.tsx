'use client';
import { JSX } from 'react';

import type { LucideIcon } from 'lucide-react';
import type { IconType } from 'react-icons/lib';

import { cn } from '@/lib/utils';

interface ShapeToolProps {
  icon: IconType | LucideIcon;
  iconClassName?: string;

  onClick: () => void;
}

export const ShapeTool = ({
  icon: Icon,
  iconClassName,
  onClick,
}: ShapeToolProps): JSX.Element => {
  return (
    <button className="aspect-square border rounded-md p-5" onClick={onClick}>
      <Icon className={cn('h-full w-full', iconClassName)} />
    </button>
  );
};
