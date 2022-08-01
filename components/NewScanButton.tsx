export default function NewScanButton(props: { reset: () => void }) {
  return (
    <div className="flex justify-center">
      <button className="btn bg-blue-400 text-white hover:bg-blue-500 my-6" type="submit" onClick={props.reset}>
        Begin new scan
      </button>
    </div>
  );
}
