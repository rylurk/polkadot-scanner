import { ReactElement, useState } from 'react';

export default function useNumberInput(initialValue: number, id: string, placeholder?: string): [number, ReactElement] {
  const [value, setValue] = useState(initialValue);

  const input = (
    <input
      className="border border-solid border-slate-200 rounded focus:border-blue-600 focus:outline-none w-full h-10 px-2 mb-6"
      type="number"
      id={id}
      value={value !== 0 ? value : ''}
      placeholder={'' || placeholder}
      onChange={(event) => setValue(Number(event.target.value))}
    />
  );

  return [value, input];
}
