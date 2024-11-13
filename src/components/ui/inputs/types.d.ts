import type { ReactNode } from "react";

//TODO remove unused props
export type TextFieldProps = {
  label?: ReactNode;
  LockedIcon?: React.ReactNode;
  hint?: ReactNode;
  hintErrors?: string[];
  addOnLeading?: ReactNode;
  addOnSuffix?: ReactNode;
  inputIsFullWidth?: boolean;
  addOnFilled?: boolean;
  addOnClassname?: string;
  error?: string;
  labelSrOnly?: boolean;
  containerClassName?: string;
  showAsteriskIndicator?: boolean;
  t?: (key: string) => string;
  dataTestid?: string;
  noLabel?: boolean;
  onClickAddon?: () => void;
} & InputProps & {
    labelProps?: React.ComponentProps<typeof Label>;
    labelClassName?: string;
  };

export type InputProps = JSX.IntrinsicElements["input"] & {
  isFullWidth?: boolean;
};
