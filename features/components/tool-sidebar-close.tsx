'use client';

import { JSX } from 'react';

import { ChevronLeft } from 'lucide-react';

interface ToolSideBarCloseProps {
  onClick: () => void;
}

export const ToolSideBarClose = ({
  onClick,
}: ToolSideBarCloseProps): JSX.Element => {
  return (
    <button
      className="absolute -right-[1.80rem] h-17.5 bg-white top-1/2 transform  -translate-y-1/2 flex items-center justify-center rounded-r-xl px-1 pr-2 border-r border-y group"
      onClick={onClick}
    >
      <ChevronLeft className="size-4 text-black group-hover:opacity-75 transition" />
    </button>
  );
};
