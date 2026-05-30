import DataGrid from './components/DataGrid/DataGrid.tsx';
import { type Event, mockEvents } from './data/mockEvents';
import type { ColumnConfig } from './components/DataGrid/types';
import EventForm from './components/EventForm/EventForm.tsx';
import { useCallback, useState } from 'react';
import Modal from './components/Modal.tsx';

const columns: ColumnConfig<Event>[] = [
    { accessor: 'title', label: 'Title' },
    { accessor: 'date', label: 'Date' },
    { accessor: 'category', label: 'Category' },
    { accessor: 'description', label: 'Description' },
];

function App() {
    const [modalOpen, setModalOpen] = useState(false);
    const handleClose = useCallback(() => setModalOpen(false), []);

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-800">Event Manager</h1>
                <button
                    onClick={() => setModalOpen(true)}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    + New Event
                </button>
            </header>

            <main className="p-6 max-w-6xl mx-auto">
                <DataGrid columns={columns} data={mockEvents} loading={false} error={null} />
            </main>

            <Modal open={modalOpen} onClose={handleClose} title="New Event">
                <EventForm onSave={(data) => console.log(data)} onCancel={handleClose} />
            </Modal>
        </div>
    );
}

export default App;
