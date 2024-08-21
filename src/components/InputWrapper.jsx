import { Input } from "@/components/ui/input";

export function InputWrapper({ onClick, value, readOnly, className }) {
  return (
    <Input
      onClick={onClick}
      value={value}
      readOnly={readOnly}
      className={className}
    />
  );
}
