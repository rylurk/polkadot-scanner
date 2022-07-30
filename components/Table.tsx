import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';
import Filter from '../components/Filter';
import { EventData } from '../utils/PolkadotScanner';

export default function Table({ data, columns }: { data: EventData[]; columns: ColumnDef<EventData>[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expandData, setExpandData] = useState(false);

  const table = useReactTable({
    data,
    columns,
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
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div className="font-semibold text-sm tracking-wider mb-2 float-left">
                        <div className="cursor-pointer select-none" onClick={header.column.getToggleSortingHandler()}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{ asc: ' ⬆️', desc: ' ⬇️' }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div
                            onClick={() => {
                              header.column.getToggleSortingHandler();
                            }}
                          >
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className="text-slate-700">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className={`py-1 px-4 border border-gray ${!expandData && 'max-w-0 overflow-hidden'}`}
                    >
                      <div className="">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center gap-2 mt-4 font-light">
        <button
          className="border rounded py-2 px-4"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded py-2 px-4"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded py-2 px-4"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded py-2 px-4"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <div className="font-medium">
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border py-2 px-4 rounded w-16"
          />
        </span>
        <select
          className="py-[11px] px-4 border border-gray-200 rounded"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <button
          className="border-transparent rounded border-solid border-2 transition-colors duration-500 ease-in-out font-medium text-sm uppercase tracking-widest bg-gray-100 hover:bg-gray-200 py-2 px-5 mx-2"
          type="submit"
          onClick={() => setExpandData(!expandData)}
        >
          Expand data
        </button>
      </div>
      <div className="mt-4 font-light">{table.getRowModel().rows.length} Rows | All columns sortable on click</div>
    </div>
  );
}
