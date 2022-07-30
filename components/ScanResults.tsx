import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import Table from './Table';
import { useQuery } from '@tanstack/react-query';
import { EventData, getEventsByBlockRange, getLastBlockNumber } from '../utils/PolkadotScanner';

type Props = {
  startBlock: number;
  endBlock: number;
  endpoint: string;
  reset: () => void;
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
            header: () => 'Method Name',
          },
          {
            accessorKey: 'data',
            header: () => 'Data',
          },
        ],
      },
    ],
    []
  );

  return (
    <div className="py-6 px-10">
      <div className="flex justify-center text-xl font-semibold text-slate-700">
        Events from block
        <div className="mx-1 text-blue-500">{props.startBlock}</div>
        to block
        <div className="mx-1 text-blue-500">{props.endBlock}</div>
      </div>
      {!allBlockEvents.isFetched || !allBlockEvents.data ? (
        <div className="flex justify-center">
          <div className="ease-linear border-t-blue-400 animate-spin rounded-full border-gray-200 h-20 w-20 my-20 border-8 border-t-8" />
        </div>
      ) : (
        <>
          <Table {...{ data: allBlockEvents.data, columns }} />
          <div className="flex justify-center">
            <button
              className="border-transparent rounded border-solid border-2 transition-colors duration-500 ease-in-out font-medium text-sm uppercase tracking-widest bg-blue-400 text-white hover:bg-blue-500 py-2 px-5 my-6"
              type="submit"
              onClick={props.reset}
            >
              Begin new scan
            </button>
          </div>
        </>
      )}
    </div>
  );
}
