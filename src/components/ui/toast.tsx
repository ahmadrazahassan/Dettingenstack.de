"use client";

import { Check } from "lucide-react";
import { Toast as ToastPrimitive } from "radix-ui";
import {
  createContext,
  type ReactNode,
  use,
  useCallback,
  useState,
} from "react";

type ToastItem = { id: number; message: string };
const ToastContext = createContext<(message: string) => void>(() => {});

export function useToast() {
  return use(ToastContext);
}

// Bottom-left, black, white text, yellow check, 5s auto-dismiss (§10.12).
export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const show = useCallback((message: string) => {
    setItems((prev) => [...prev, { id: Date.now(), message }]);
  }, []);

  return (
    <ToastContext value={show}>
      <ToastPrimitive.Provider duration={5000} label="Benachrichtigung">
        {children}
        {items.map((item) => (
          <ToastPrimitive.Root
            key={item.id}
            onOpenChange={(open) => {
              if (!open)
                setItems((prev) => prev.filter((t) => t.id !== item.id));
            }}
            className="flex items-center gap-3 rounded-md bg-black px-4 py-3 font-ui text-[15px] text-white shadow-lg data-[state=closed]:opacity-0 data-[state=open]:animate-[toast-in_200ms_var(--ease-brand)]"
          >
            <Check
              aria-hidden
              className="size-4 shrink-0 text-brand"
              strokeWidth={2.5}
            />
            <ToastPrimitive.Description>
              {item.message}
            </ToastPrimitive.Description>
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport className="fixed bottom-4 left-4 z-80 flex max-w-[calc(100vw-2rem)] flex-col gap-2 outline-none sm:bottom-6 sm:left-6" />
      </ToastPrimitive.Provider>
    </ToastContext>
  );
}
