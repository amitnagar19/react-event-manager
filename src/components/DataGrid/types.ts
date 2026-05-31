export interface ColumnConfig<T> {
    accessor: keyof T & string;
    label: string;
    hidden?: boolean;
    format?: (value: unknown) => string;
}

export interface DataGridProps<T extends object> {
    columns: ColumnConfig<T>[];
    data: T[];
    loading?: boolean;
    error?: string | null;
    pageSize?: number;
}
