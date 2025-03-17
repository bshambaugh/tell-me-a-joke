import { Input } from '@/components/ui/input';
import React from 'react';
import { InputHTMLAttributes } from 'react';

interface CustomInputProps {
  id: string;
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
}

// Combine custom props with native input props
const CustomInput: React.FC<CustomInputProps & InputHTMLAttributes<HTMLInputElement>> = ({
    id,
    placeholder,
    value,
    onValueChange,
    ...rest
  }) => (
    <Input
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      {...rest}
    />
  );

export default CustomInput;