import { forwardRef, useId } from "react";

import { cn } from "@/lib/utils";
import { Button } from "../../button";
import { Label } from "../../label";
import { FormMessage } from "../form";
import { TextFieldProps } from "./types";

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const id = useId();
  const {
    className,
    label,
    onIconClick,
    icon,
    labelClassName,
    ...passThrough
  } = props;

  return (
    <div>
      <div>
        <Label htmlFor={id} className={labelClassName}>
          {label}
        </Label>
        {passThrough.required && <span className="text-red-500">*</span>}
      </div>
      <div className="relative">
        <input
          id={id}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...passThrough}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={onIconClick}
          tabIndex={-1}
        >
          {icon}
        </Button>
      </div>
      <FormMessage fieldName={props.name} />
    </div>
  );
});
TextField.displayName = "TextField";

export { TextField };
