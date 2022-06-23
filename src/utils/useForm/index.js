// React Hooks : Bisa return hanya value saja
import { useState } from 'react';

export const useForm = initialValue => {
  const [values, setValues] = useState(initialValue);
  // return valuenya
  return [
    values,
    // lalu return fungsi untuk mengubah value
    (formType, formValue) => {
      // return value baru
      // Lalu copy value lama ...
      return setValues({ ...values, [formType]: formValue });
    },
  ];
};
