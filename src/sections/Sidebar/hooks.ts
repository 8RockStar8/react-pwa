import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const sidebarOpen = atom(false);

export function useSidebar() {
  const [isOpen, setOpen] = useAtom(sidebarOpen);
  const open = useCallback(() => setOpen(true), [setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);
  return { isOpen, open, close };
}
