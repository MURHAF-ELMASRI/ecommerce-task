import { forwardRef, useId } from "react";

import { cn } from "@/lib/utils";
import { Label } from "../../label";
import { FormMessage } from "../form";
import { TextFieldProps } from "./types";

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const id = useId();
  const { className, label, ...passThrough } = props;

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...passThrough}
      />
      <FormMessage fieldName={props.name} />
    </div>
  );
});
TextField.displayName = "TextField";

export { TextField };
