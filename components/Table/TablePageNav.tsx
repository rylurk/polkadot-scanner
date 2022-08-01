import { Table } from '@tanstack/react-table';
import { EventData } from '../../types/EventData';

export default function TablePageNav(props: { table: Table<EventData> }) {
  return (
    <>
      <button
        className="border rounded py-2 px-4"
        onClick={() => props.table.setPageIndex(0)}
        disabled={!props.table.getCanPreviousPage()}
      >
        {'<<'}
      </button>
      <button
        className="border rounded py-2 px-4"
        onClick={() => props.table.previousPage()}
        disabled={!props.table.getCanPreviousPage()}
      >
        {'<'}
      </button>
      <button
        className="border rounded py-2 px-4"
        onClick={() => props.table.nextPage()}
        disabled={!props.table.getCanNextPage()}
      >
        {'>'}
      </button>
      <button
        className="border rounded py-2 px-4"
        onClick={() => props.table.setPageIndex(props.table.getPageCount() - 1)}
        disabled={!props.table.getCanNextPage()}
      >
        {'>>'}
      </button>
      <span className="flex items-center gap-1">
        <div>Page</div>
        <div className="font-medium">
          {props.table.getState().pagination.pageIndex + 1} of {props.table.getPageCount()}
        </div>
      </span>
      <span className="flex items-center gap-1">
        | Go to page:
        <input
          type="number"
          defaultValue={props.table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            props.table.setPageIndex(page);
          }}
          className="border py-2 px-4 rounded w-16"
        />
      </span>
    </>
  );
}
