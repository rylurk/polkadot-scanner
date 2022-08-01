import { Table } from '@tanstack/react-table';
import { EventData } from '../../types/EventData';

export default function RowCountSelect(props: { table: Table<EventData> }) {
  return (
    <select
      className="py-[11px] px-4 border border-gray-200 rounded"
      value={props.table.getState().pagination.pageSize}
      onChange={(e) => {
        props.table.setPageSize(Number(e.target.value));
      }}
    >
      {[10, 20, 30, 40, 50].map((pageSize) => (
        <option key={pageSize} value={pageSize}>
          Show {pageSize}
        </option>
      ))}
    </select>
  );
}
