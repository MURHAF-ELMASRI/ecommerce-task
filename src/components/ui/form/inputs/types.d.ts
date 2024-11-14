import type { ReactNode } from "react";

//TODO remove unused props
export type TextFieldProps = {
  label?: ReactNode;
  icon?: ReactNode;
  onIconClick?: () => void;
} & InputProps & {
    labelClassName?: string;
  };

export type InputProps = JSX.IntrinsicElements["input"] & {
  isFullWidth?: boolean;
  name: string;
};
