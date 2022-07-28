import { useMemo } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import Table from '../components/Table';
import { useQuery } from '@tanstack/react-query';
import { EventData, getEventsByBlock } from '../utils/PolkadotScanner';

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];

export default function TablePage() {
  const testBlock = 11350896;
  const blockEvents = useQuery(['getEventsByBlock', testBlock], () => getEventsByBlock(testBlock));

  const columns = useMemo<ColumnDef<EventData>[]>(
    () => [
      {
        header: 'Event Data',
        footer: (props) => props.column.id,
        columns: [
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
      {
        header: 'Optional Transfer Data',
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: 'accountId',
            header: () => 'Account ID',
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'amount',
            header: () => 'Amount Transferred',
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
    return <Table {...{ data: blockEvents.data, columns }} />;
  }
}
