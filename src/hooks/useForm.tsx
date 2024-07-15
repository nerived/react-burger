import { useState, ChangeEvent } from "react";
import { shallowEqual } from "react-redux";

type UseForm<T> = {
  values: T;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setValues: (values: T) => void;
  reset: () => void;
  isChanged: boolean;
};

export function useForm<T>(inputValues: T): UseForm<T> {
  const [values, setValues] = useState<T>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  const reset = () => {
    setValues(inputValues);
  };

  const isChanged = !shallowEqual(inputValues, values);

  return { values, handleChange, setValues, reset, isChanged };
}
