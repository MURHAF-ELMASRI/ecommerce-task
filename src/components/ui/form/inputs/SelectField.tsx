import { useId } from "react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { FormControl, FormMessage } from "../form";
import { SelectFieldPropsType } from "./types";

export function SelectField<T extends Record<string, string>>(
  props: SelectFieldPropsType<T>
) {
  const id = useId();
  const { getValues, setValue } = useFormContext();

  const {
    label,
    options,
    valueField = "value",
    labelField = "label",
    labelClassName,
    placeholder,
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
      <Select
        {...passThrough}
        onValueChange={(value) => {
          setValue(passThrough.name, value);
        }}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option[valueField]} value={option[valueField]}>
              {option[labelField]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <FormMessage fieldName={props.name} />
    </div>
  );
}
