import DataGrid from "./components/DataGrid/DataGrid.tsx";
import  {mockEvents,type Event} from './data/mockEvents';
import type {ColumnConfig} from './components/DataGrid/types';

const columns: ColumnConfig<Event>[] = [
    { accessor: 'title', label: 'Title' },
    { accessor: 'date', label: 'Date' },
    { accessor: 'category', label: 'Category' },
    { accessor: 'description', label: 'Description' },
]

function App() {

  return (
      <div className="p-8">
        <DataGrid columns={columns} data={mockEvents} />
      </div>
  )
}

export default App
