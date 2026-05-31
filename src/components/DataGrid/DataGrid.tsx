import { useMemo, useState } from 'react';
import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable
} from '@tanstack/react-table';
import type { DataGridProps } from './types.ts';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import ColumnToggle from './ColumnToggle.tsx';

function DataGrid<T extends object>({
    columns: columnConfigs,
    data,
    loading,
    error,
    pageSize = 10,
}: DataGridProps<T>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const columns = useMemo<ColumnDef<T>[]>(
        () =>
            columnConfigs.map((c) => ({
                id: c.accessor,
                accessorKey: c.accessor,
                header: c.label,
            })),
        [columnConfigs],
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize } },
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-48 text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {error}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded border border-gray-200">
            <ColumnToggle table={table} />
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="px-4 py-2 font-medium text-gray-700">
                                    <div
                                        className="flex items-center gap-1 cursor-pointer select-none hover:text-blue-600"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                        <span className="inline-flex text-gray-400">
                                            {{
                                                asc: <ArrowUp size={14} />,
                                                desc: <ArrowDown size={14} />,
                                            }[header.column.getIsSorted() as string] ?? (
                                                <ArrowUpDown size={14} />
                                            )}
                                        </span>
                                    </div>
                                    <input
                                        value={(header.column.getFilterValue() as string) ?? ''}
                                        onChange={(e) =>
                                            header.column.setFilterValue(e.target.value)
                                        }
                                        placeholder="Filter..."
                                        className="mt-1 w-full px-2 py-1 border border-gray-200 rounded text-xs font-normal focus:outline-none focus:border-blue-400"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {table.getRowModel().rows.length === 0 ? (
                        <tr>
                            <td
                                colSpan={table.getVisibleLeafColumns().length}
                                className="px-4 py-12 text-center text-gray-400"
                            >
                                No results found
                            </td>
                        </tr>
                    ) : (
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-4 py-2 text-gray-700">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 text-sm text-gray-600">
                <span>
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} ·{' '}
                    {table.getFilteredRowModel().rows.length} rows
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-3 py-1 border border-gray-300 rounded disabled:opacity-40 hover:bg-gray-50 cursor-pointer"
                    >
                        Prev
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-3 py-1 border border-gray-300 rounded disabled:opacity-40 hover:bg-gray-50 cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DataGrid;
