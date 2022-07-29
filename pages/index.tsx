import { useMemo } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import Table from '../components/Table';
import { useQuery } from '@tanstack/react-query';
import { EventData, getEventsByBlock, getEventsByBlockRange } from '../utils/PolkadotScanner';

export default function HomePage() {
  const startBlock = 11350886;
  const endBlock = 11350896;
  const blockEvents = useQuery(['getEventsByBlock', 11350896], () => getEventsByBlock(11350896));
  const allBlockEvents = useQuery(['getEventsByBlockRange', startBlock, endBlock], () =>
    getEventsByBlockRange(startBlock, endBlock)
  );

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

  if (allBlockEvents.isLoading) {
    return (
      <div className="flex justify-center">
        <div className="ease-linear border-t-blue-400 animate-spin rounded-full border-gray-200 h-20 w-20 mt-20 border-8 border-t-8" />
      </div>
    );
  }

  if (allBlockEvents.isFetched && allBlockEvents.data) {
    return (
      <div className="py-6 px-10 ">
        <Table {...{ data: allBlockEvents.data, columns }} />
      </div>
    );
  }
}
