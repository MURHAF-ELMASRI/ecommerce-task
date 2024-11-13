import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { TextFieldProps } from "./types";

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const { type, className, label, placeholder, ...passThrough } = props;
    const id = React.useId();

    return (
      <div className="grid gap-2">
        <Label htmlFor={id}>{label}</Label>
        <input
          id={id}
          placeholder={placeholder}
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...passThrough}
        />
        <HintsOrErrors hintErrors={hintErrors} fieldName={name} t={t} />
      </div>
    );
  }
);
TextField.displayName = "TextField";

export { TextField };
