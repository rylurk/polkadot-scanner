import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import Table from './Table';
import { useQuery } from '@tanstack/react-query';
import { EventData, getEventsByBlockRange, getLastBlockNumber } from '../utils/PolkadotScanner';

type Props = {
  startBlock: number;
  endBlock: number;
  endpoint: string;
};

export default function ResultsPage(props: Props) {
  const allBlockEvents = useQuery(['getEventsByBlockRange', props.startBlock, props.endBlock, props.endpoint], () =>
    getEventsByBlockRange(props.startBlock, props.endBlock, props.endpoint)
  );

  const columns = useMemo<ColumnDef<EventData>[]>(
    () => [
      {
        header: '-',
        columns: [
          {
            accessorKey: 'eventId',
            header: () => 'Event ID',
            cell: (info) => info.getValue(),
          },
          {
            accessorKey: 'blockNum',
            header: () => 'Block Number',
          },
          {
            accessorKey: 'extrinsicId',
            header: () => 'Extrinsic ID',
          },
          {
            accessorKey: 'section',
            header: () => 'Section',
          },
          {
            accessorKey: 'method',
            header: () => 'Method',
          },
        ],
      },
    ],
    []
  );

  if (!allBlockEvents.isFetched || !allBlockEvents.data) {
    return (
      <div className="flex justify-center">
        <div className="ease-linear border-t-blue-400 animate-spin rounded-full border-gray-200 h-20 w-20 mt-20 border-8 border-t-8" />
      </div>
    );
  }

  return (
    <div className="py-6 px-10">
      <div className="flex justify-center text-xl font-semibold text-slate-700">
        Events from block
        <div className="mx-1 text-blue-500">{props.startBlock}</div>
        to block
        <div className="mx-1 text-blue-500">{props.endBlock}</div>
      </div>
      <Table {...{ data: allBlockEvents.data, columns }} />
    </div>
  );
}
