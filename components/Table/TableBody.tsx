import { flexRender, Table } from '@tanstack/react-table';
import { EventData } from '../../types/EventData';

export default function TableBody(props: { table: Table<EventData>; expandData: boolean }) {
  return (
    <tbody>
      {props.table.getRowModel().rows.map((row) => {
        return (
          <tr key={row.id} className="text-slate-700">
            {row.getVisibleCells().map((cell) => {
              return (
                <td
                  key={cell.id}
                  className={`py-1 px-4 border border-gray ${!props.expandData && 'max-w-0 overflow-hidden'}`}
                >
                  <div className="">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
