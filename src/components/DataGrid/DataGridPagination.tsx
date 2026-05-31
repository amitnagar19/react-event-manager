import type { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props<T> {
    table: Table<T>;
}
function DataGridPagination<T>({ table }: Props<T>) {
    return (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 text-sm text-gray-600">
            <div className="flex items-center gap-2">
                <span>Rows per page:</span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => table.setPageSize(Number(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-400 cursor-pointer"
                >
                    {[10, 25, 50].map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>

            <span>
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} ·{' '}
                {table.getFilteredRowModel().rows.length} rows
            </span>

            <div className="flex gap-2">
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="inline-flex items-center gap-1 px-3 py-1 border border-gray-300 rounded disabled:opacity-40 hover:bg-gray-50 cursor-pointer"
                >
                    <ChevronLeft size={14} /> Prev
                </button>
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="inline-flex items-center gap-1 px-3 py-1 border border-gray-300 rounded disabled:opacity-40 hover:bg-gray-50 cursor-pointer"
                >
                    Next <ChevronRight size={14} />
                </button>
            </div>
        </div>
    );
}

export default DataGridPagination;
