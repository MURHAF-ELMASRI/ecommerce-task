import { Select } from "@radix-ui/react-select";
import type { ReactNode } from "react";

export type TextFieldProps = {
  label?: ReactNode;
  icon?: ReactNode;
  onIconClick?: () => void;
} & JSX.IntrinsicElements["input"] & {
    name: string;
    labelClassName?: string;
  };

export type SelectFieldPropsType<T extends Record<string, unknown>> = {
  label?: ReactNode;
  name: string;
  labelClassName?: string;
  options: Array<T>;
  valueField?: keyof T;
  labelField?: keyof T;
  placeholder?: string;
} & React.ComponentPropsWithoutRef<typeof Select>;
