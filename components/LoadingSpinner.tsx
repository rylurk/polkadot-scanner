export default function LoadingSpinner(props: { verticalOffset: string }) {
  return (
    <div className="flex justify-center">
      <div
        className={`ease-linear border-t-blue-400 animate-spin rounded-full border-gray-200 h-20 w-20 border-8 border-t-8 ${props.verticalOffset}`}
      />
    </div>
  );
}
