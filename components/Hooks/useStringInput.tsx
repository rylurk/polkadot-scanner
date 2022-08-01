import { ReactElement, useState } from 'react';

export default function useStringInput(initialValue: string, id: string, placeholder?: string): [string, ReactElement] {
  const [value, setValue] = useState(initialValue);

  const input = (
    <input
      className="border border-solid border-slate-200 rounded focus:border-blue-600 focus:outline-none w-full h-10 px-2 mb-6"
      type="text"
      id={id}
      value={value}
      placeholder={'' || placeholder}
      onChange={(event) => setValue(event.target.value)}
    />
  );

  return [value, input];
}
