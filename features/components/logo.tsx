'use client';

import { JSX } from 'react';

import Image from 'next/image';
import Link from 'next/link';

export const Logo = (): JSX.Element => {
  return (
    <Link href="/">
      <div className="size-8 relative shrink-0">
        <Image
          className="shrink-0 hover:opacity-75"
          src="/logo.svg"
          fill
          alt="logo"
        />
      </div>
    </Link>
  );
};
