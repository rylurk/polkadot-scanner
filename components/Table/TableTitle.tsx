export default function TableHeader(props: { startBlock: number; endBlock: number }) {
  return (
    <div className="flex justify-center text-xl font-semibold text-slate-700">
      Events from block
      <div className="mx-1 text-blue-500">{props.startBlock}</div>
      to block
      <div className="mx-1 text-blue-500">{props.endBlock}</div>
    </div>
  );
}
