import { useQuery } from '@tanstack/react-query';
import { getEventsByBlock } from '../utils/PolkadotScanner';

export default function HomePage() {
  const testBlock = 11350896;
  const blockEvents = useQuery(['getEventsByBlock', testBlock], () => getEventsByBlock(testBlock));

  if (blockEvents.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{testBlock}</h1>
      <ul>
        {blockEvents.data!.map((ev) => (
          <li key={ev.eventId}>{ev.method}</li>
        ))}
      </ul>
    </div>
  );
}
