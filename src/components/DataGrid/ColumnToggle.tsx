import type { Table } from '@tanstack/react-table';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Props<T> {
    table: Table<T>;
}

function ColumnToggle<T>({ table }: Props<T>) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const visibleCount = table.getVisibleLeafColumns().length;
    const totalCount = table.getAllLeafColumns().length;

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative inline-block">
            <button
                onClick={() => setOpen((o) => !o)}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 cursor-pointer"
            >
                Columns ({visibleCount} of {totalCount})
                <ChevronDown size={14} className="inline ml-1" />
            </button>
            {open && (
                <div className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg z-10 p-2">
                    <div className="px-2 py-1 text-xs text-gray-400 font-medium uppercase tracking-wide border-b border-gray-100 mb-1">
                        Show / Hide
                    </div>
                    {table.getAllLeafColumns().map((col) => (
                        <label
                            key={col.id}
                            className="flex items-center gap-2 px-2 py-1 hover:bg-gray-50 rounded cursor-pointer text-sm"
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
            )}
        </div>
    );
}

export default ColumnToggle;
