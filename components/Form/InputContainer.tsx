export default function InputContainer(props: { label: string; input: JSX.Element }) {
  return (
    <div>
      <label className="mb-2 block text-slate-600" htmlFor="source">
        {props.label}
      </label>
      {props.input}
    </div>
  );
}
