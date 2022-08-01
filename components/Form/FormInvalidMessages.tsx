export default function FormInvalidMessages(props: { messages: string[] }) {
  return (
    <div className="mt-8">
      {props.messages.map((msg) => (
        <div key={msg} className="mb-4 text-red-400">
          {msg}
        </div>
      ))}
    </div>
  );
}
