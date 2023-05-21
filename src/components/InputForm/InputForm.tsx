import React from 'react';
import { InputBase } from '@mui/material';
import {
  FieldErrors,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

interface InputFormProps<Type extends FieldValues> {
  labelName: string;
  name: FieldPath<Type>;
  register: UseFormRegister<Type>;
  validation?: RegisterOptions<Type>;
  type: 'text' | 'password' | 'email';
  errors: FieldErrors<Type>;
  placeholder?: string;
  value?: string;
}

export default function InputForm<T extends FieldValues>({
  labelName,
  errors,
  name,
  type,
  placeholder,
  value,
  register,
  validation,
}: InputFormProps<T>) {
  return (
    <>
      <div className="input-wrap">
        <label htmlFor={name} className="label">
          {labelName}:
        </label>
        <InputBase
          className="input"
          type={type}
          value={value}
          placeholder={placeholder}
          {...register(name, validation)}
        />
      </div>
      {errors[name] && (
        <p className={`form-control ${errors.password ? 'errDis' : 'errMess'}`}>
          {errors[name]?.message?.toString()}
        </p>
      )}
    </>
  );
}
InputForm.defaultProps = {
  placeholder: '',
  validation: {},
};
