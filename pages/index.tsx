import { useMemo } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import Table from '../components/Table';
import { useQuery } from '@tanstack/react-query';
import { EventData, getEventsByBlock } from '../utils/PolkadotScanner';

export default function HomePage() {
  const testBlock = 11350896;
  const blockEvents = useQuery(['getEventsByBlock', testBlock], () => getEventsByBlock(testBlock));

  const columns = useMemo<ColumnDef<EventData>[]>(
    () => [
      {
        header: 'Events Data',
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: 'blockNum',
            header: () => 'Block',
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'eventId',
            header: () => 'Event ID',
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'extrinsicId',
            header: () => 'Extrinsic ID',
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'section',
            header: () => 'Section',
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'method',
            header: () => 'Method',
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
    []
  );

  if (blockEvents.isLoading) {
    return <div>Loading...</div>;
  }

  if (blockEvents.isFetched && blockEvents.data) {
    return (
      <div className="py-6 px-10 ">
        <Table {...{ data: blockEvents.data, columns }} />
      </div>
    );
  }
}
