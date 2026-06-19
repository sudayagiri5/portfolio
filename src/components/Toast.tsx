"use client";
import { useEffect, useRef, useImperativeHandle, type Ref } from "react";

export interface ToastHandle {
  show: (msg: string) => void;
}

export default function Toast({ ref }: { ref?: Ref<ToastHandle> }) {
  const elRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useImperativeHandle(ref, () => ({
    show(msg: string) {
      const el = elRef.current;
      if (!el) return;
      el.textContent = msg;
      el.classList.add("show");
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => el.classList.remove("show"), 2000);
    },
  }));

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <div id="toast" className="mono" ref={elRef} role="status" aria-live="polite" />
  );
}
