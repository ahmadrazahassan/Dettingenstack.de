import { TriangleAlert } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export const inputStyles =
  "h-12 w-full rounded-md border border-neutral-300 bg-white px-4 font-ui text-base text-black outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-neutral-500 focus-visible:border-black focus-visible:shadow-[0_0_0_3px_var(--color-brand)] focus-visible:outline-none aria-invalid:border-negative disabled:bg-neutral-50 disabled:text-neutral-500";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(inputStyles, className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(inputStyles, "h-auto min-h-32 py-3 leading-6", className)}
      {...props}
    />
  );
}

export function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: htmlFor is passed by the caller.
    <label
      className={cn(
        "mb-2 block font-medium font-ui text-black text-sm",
        className,
      )}
      {...props}
    />
  );
}

// Label + control + hint + error, wired with aria-describedby.
export function Field({
  id,
  label,
  hint,
  error,
  required,
  children,
  className,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: (describedBy: string | undefined) => ReactNode;
  className?: string;
}) {
  const hintId = hint ? `${id}-hinweis` : undefined;
  const errorId = error ? `${id}-fehler` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      <Label htmlFor={id}>
        {label}
        {required && (
          <span className="text-neutral-600" aria-hidden>
            {" "}
            *
          </span>
        )}
      </Label>
      {children(describedBy)}
      {hint && (
        <p id={hintId} className="mt-1.5 type-ui-sm text-neutral-600">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          className="mt-1.5 flex items-center gap-1.5 type-ui-sm text-negative"
        >
          <TriangleAlert aria-hidden className="size-3.5" strokeWidth={1.75} />
          {error}
        </p>
      )}
    </div>
  );
}
