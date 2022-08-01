import { flexRender, Table } from '@tanstack/react-table';
import { EventData } from '../../types/EventData';
import ColumnFilters from './ColumnFilters';

export default function TableHeads(props: { table: Table<EventData> }) {
  return (
    <thead>
      {props.table.getHeaderGroups().map((headerGroup) => (
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
                        <ColumnFilters column={header.column} table={props.table} />
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
  );
}
