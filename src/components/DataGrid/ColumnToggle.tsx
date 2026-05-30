import type { Table } from '@tanstack/react-table';

interface Props<T> {
    table: Table<T>;
}

function ColumnToggle<T>({ table }: Props<T>) {
    return (
        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded border border-gray-200">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide shrink-0">
                Columns
            </span>
            <div className="flex gap-4 flex-wrap">
                {table.getAllLeafColumns().map((col) => (
                    <label
                        key={col.id}
                        className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            checked={col.getIsVisible()}
                            onChange={col.getToggleVisibilityHandler()}
                            className="accent-blue-600"
                        />
                        {col.columnDef.header as string}
                    </label>
                ))}
            </div>
        </div>
    );
}

export default ColumnToggle;
