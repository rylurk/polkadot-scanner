import { Column, Table as ReactTable } from '@tanstack/react-table';

export default function Filter(props: { column: Column<any, any>; table: ReactTable<any> }) {
  const firstValue = props.table.getPreFilteredRowModel().flatRows[0]?.getValue(props.column.id);
  const columnFilterValue = props.column.getFilterValue();

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-1">
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={(e) => props.column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]])}
        placeholder={`Min`}
        className="w-20 border rounded font-normal py-1 px-2"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={(e) => props.column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value])}
        placeholder={`Max`}
        className="w-20 border rounded font-normal py-1 px-2"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={(e) => props.column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-40 border rounded font-normal py-1 px-2 mx-1"
    />
  );
}
