// React Hooks : Bisa return hanya value saja
import { useState } from 'react';

export const useForm = initialValue => {
  const [values, setValues] = useState(initialValue);
  // return valuenya, lalu return fungsi untuk mengubah value
  return [
    values,
    (formType, formValue) => {
      // return value baru
      // Lalu copy value lama ...
      return setValues({ ...values, [formType]: formValue });
    },
  ];
};
