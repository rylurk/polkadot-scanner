import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import Table from './Table/Table';
import { useQuery } from '@tanstack/react-query';
import { getEventsByBlockRange } from '../utils/PolkadotScanner';
import { EventData } from '../types/EventData';
import TableTitle from './Table/TableTitle';
import NewScanButton from './NewScanButton';
import LoadingSpinner from './LoadingSpinner';

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
          { accessorKey: 'eventId', header: () => 'Event ID', cell: (info) => info.getValue() },
          { accessorKey: 'blockNum', header: () => 'Block Number' },
          { accessorKey: 'extrinsicId', header: () => 'Extrinsic ID' },
          { accessorKey: 'section', header: () => 'Section' },
          { accessorKey: 'method', header: () => 'Method Name' },
          { accessorKey: 'data', header: () => 'Data' },
        ],
      },
    ],
    []
  );

  return (
    <div className="py-6 px-10">
      <TableTitle startBlock={props.startBlock} endBlock={props.endBlock} />
      {!allBlockEvents.isFetched || !allBlockEvents.data ? (
        <LoadingSpinner verticalOffset="my-20" />
      ) : (
        <>
          <Table {...{ data: allBlockEvents.data, columns }} />
          <NewScanButton reset={props.reset} />
        </>
      )}
    </div>
  );
}
