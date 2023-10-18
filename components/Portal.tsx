'use client';

import { FC, useRef, useEffect, useState, ReactNode } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  selector: string;
  children: ReactNode;
};

export const Portal: FC<Props> = ({ children, selector }) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>(selector)
    setMounted(true)
  }, []);

  if (!mounted || !ref.current) {
    return null;
  }

  return (
    createPortal(
      <>{children}</>, 
      ref.current
    )
  );
};