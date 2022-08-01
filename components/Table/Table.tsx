import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';
import { EventData } from '../../types/EventData';
import TableHeads from './TableHeads';
import TableBody from './TableBody';
import TablePageNav from './TablePageNav';
import RowCountSelect from './RowCountSelect';

export default function Table(props: { data: EventData[]; columns: ColumnDef<EventData>[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expandData, setExpandData] = useState(false);

  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  return (
    <div className="p-2">
      <table>
        <TableHeads table={table} />
        <TableBody table={table} expandData={expandData} />
      </table>
      <div className="flex items-center gap-2 mt-4 font-light">
        <TablePageNav table={table} />
        <RowCountSelect table={table} />
        <button className="btn bg-gray-100 hover:bg-gray-200 mx-2" onClick={() => setExpandData(!expandData)}>
          Expand data
        </button>
      </div>
      <div className="mt-4 font-light">{table.getRowModel().rows.length} Rows | All columns sortable on click</div>
    </div>
  );
}
