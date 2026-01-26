import { JSX } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

import type { LucideIcon } from 'lucide-react';

interface SideBarItemProps {
  icon: LucideIcon;
  label: string;

  isActive?: boolean;

  onClick: () => void;
}

export const SideBarItem = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}: SideBarItemProps): JSX.Element => {
  return (
    <Button
      variant="ghost"
      className={cn(
        'w-full h-20 aspect-video p-1 flex flex-col rounded-none',
        isActive && 'bg-muted text-primary'
      )}
      onClick={onClick}
    >
      <Icon className="size-5 stroke-2 shrink-0" />
      <span className="mt-1 text-xs">{label}</span>
    </Button>
  );
};
