import { useMemo, useState } from 'react';
import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable
} from '@tanstack/react-table';
import type { DataGridProps } from './types.ts';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

function DataGrid<T extends object>({ columns: columnConfigs, data }: DataGridProps<T>) {
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
    });

    return (
        <div className="overflow-x-auto rounded border border-gray-200">
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
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="px-4 py-2 text-gray-700">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataGrid;
