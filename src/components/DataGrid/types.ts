export interface ColumnConfig<T> {
    accessor: keyof T & string
    label: string
    hidden?: boolean
}

export interface DataGridProps<T extends object> {
    columns: ColumnConfig<T>[]
    data: T[]
}
