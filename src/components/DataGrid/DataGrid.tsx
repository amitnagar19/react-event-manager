import  {useMemo} from 'react';
import {useReactTable, getCoreRowModel, flexRender, type ColumnDef} from '@tanstack/react-table'
import type {DataGridProps} from "./types.ts";


function DataGrid<T extends object>({ columns: columnConfigs, data }: DataGridProps<T>) {

    const columns = useMemo<ColumnDef<T>[]>(
        () => columnConfigs.map(c => ({
            id: c.accessor,
            accessorKey: c.accessor,
            header: c.label,
        })),
        [columnConfigs]
    )

    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })

    return (
        <div className="overflow-x-auto rounded border border-gray-200">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} className="px-4 py-2 font-medium text-gray-700">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody className="divide-y divide-gray-100">
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="hover:bg-gray-50">
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className="px-4 py-2 text-gray-700">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    )
}

export default DataGrid
